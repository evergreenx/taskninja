import { View, Text, Pressable, StyleSheet, StatusBar } from "react-native";
import React, { useState, useEffect, useRef, useCallback } from "react";

import { Link } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAuthenticator } from "@aws-amplify/ui-react-native";

import { Todo } from "../../src/models";
import { Auth } from "aws-amplify";
import { DataStore, Predicates, SortDirection } from "@aws-amplify/datastore";
import { FlashList } from "@shopify/flash-list";

import { API } from "aws-amplify";
import { listTodos, getTodo } from "../../src/graphql/queries";
import FabButton from "../../src/components/atoms/Button/fabButton";
import CustomCheckbox from "../../src/components/atoms/CheckBox/checkbox";
import CustomText from "../../src/components/atoms/Text/text";
import StickyHeader from "../../src/components/atoms/StickyHeader/stickyheader";
import BottomSheet from "../../src/components/atoms/BotttomSheet/index";
import {
  format,
  formatISO,
  isToday,
  isYesterday,
  isTomorrow,
  formatDistanceToNow,
} from "date-fns";

import Toast from "react-native-toast-message";

const size = 20;

function Task() {
  const [todos, setTodos] = useState([]);

  const sheetRef = useRef(null);

  const size = 20;

  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const fetchTodos = async () => {
    const tasks = await DataStore.query(Todo, Predicates.ALL, {
      sort: (s) => s.updatedAt(SortDirection.DESCENDING),
    });

    const checkOwner = tasks.filter(
      (note) => Auth.user.attributes.sub === note.owner
    );

    setTodos(checkOwner);
  };

  useEffect(() => {
    fetchTodos();

    const subscription = DataStore.observe(Todo).subscribe(() => fetchTodos());

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const formatTime = (date) => {
    return format(date, "HH:mm:a");
  };

  console.log(todos);

  // format date
  const formatDate = (date) => {
    if (isToday(date)) {
      return "Today";
    } else if (isYesterday(date)) {
      return "Yesterday";
    } else if (isTomorrow(date)) {
      return "Tomorrow";
    } else {
      return formatDistanceToNow(date, { addSuffix: true });
    }
  };
  const groupTasksByDay = todos.reduce((acc, order) => {
    const createdAt = new Date(order.createdAt);
    if (!isNaN(createdAt.getTime())) {
      const day = createdAt.toISOString().split("T")[0];
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(order);
    }
    return acc;
  }, {});

  // get day and notes
  const tasksData = Object.entries(groupTasksByDay).map(([day, tasks]) => ({
    day,
    tasks: tasks.sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();

      if (
        isTomorrow(new Date(a.createdAt)) &&
        !isTomorrow(new Date(b.createdAt))
      ) {
        return -1; // If a is tomorrow and b is not, a comes before b
      } else if (
        !isTomorrow(new Date(a.createdAt)) &&
        isTomorrow(new Date(b.createdAt))
      ) {
        return 1; // If b is tomorrow and a is not, b comes before a
      } else if (
        isToday(new Date(a.createdAt)) &&
        !isToday(new Date(b.createdAt))
      ) {
        return -1; // If a is today and b is not, a comes before b
      } else if (
        !isToday(new Date(a.createdAt)) &&
        isToday(new Date(b.createdAt))
      ) {
        return 1; // If b is today and a is not, b comes before a
      }

      return timeA - timeB; // Sort based on the timestamp for other cases
    }),
  }));

  const toggleTaskCompletion = async (taskId) => {
    const task = todos.find((task) => task.id === taskId);
    if (!task) {
      return;
    }

    try {
      // Update the task's completed status in DataStore
      await DataStore.save(
        Todo.copyOf(task, (updatedTask) => {
          updatedTask.completed = !task.completed;
        })
      );

      // Update the local state with the updated task
      setTodos((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      );

      // Show a toast message when the task is completed
      if (!task.completed) {
        Toast.show({
          type: "taskToast",
          text1: "Task Completed",
          text2: "Great job, you've completed the task. 🎉",
          position: "top",
          visibilityTime: 1500,
        });
      }
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  console.log(todos);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={"#000"}
        translucent
      />
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Tasks</Text>
        {todos.length > 0 ? (
          <Text>
            {todos.length} task
            {todos.length > 1 ? <Text>s</Text> : <Text></Text>}
          </Text>
        ) : (
          <Text>0 task</Text>
        )}
      </View>

      <FlashList
        showsVerticalScrollIndicator={false}
        data={tasksData} // Reverse the order of noteData
        estimatedItemSize={100}
        keyExtractor={(item) => item.day}
        // ListHeaderComponent={<StickyHeader title={"TASK"} />}
        renderItem={({ item }) => {
          return (
            <React.Fragment key={item.day}>
              <CustomText style={styles.dateText}>
                {formatDate(new Date(item.day))}
              </CustomText>
              <View style={styles.tasksContainer}>
                {item.tasks.map((task) => (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 8,
                    }}
                    key={task.id}
                  >
                    {!isTomorrow(new Date(task.createdAt)) ? ( // Condition to exclude checkbox for "Tomorrow" tasks
                      <CustomCheckbox
                        isChecked={task.completed}
                        onToggle={() => toggleTaskCompletion(task.id)}
                      />
                    ) : (
                      <CustomText>{"\u2B24"} </CustomText>
                      // Bullet point for "Tomorrow" tasks
                    )}

                    <View>
                      <CustomText
                        style={[
                          styles.tasksText,
                          {
                            textDecorationLine: task.completed
                              ? "line-through"
                              : "none",
                            opacity: task.completed ? 0.2 : 0.8,
                          },
                        ]}
                      >
                        {task.title}
                      </CustomText>

                      <CustomText
                        style={[
                          styles.tasksTime,
                          {
                            textDecorationLine: task.completed
                              ? "line-through"
                              : "none",
                            opacity: task.completed ? 0.2 : 0.8,
                          },
                        ]}
                      >
                        {formatTime(new Date(task.createdAt), {})}
                      </CustomText>
                    </View>
                  </View>
                ))}
                <View></View>
              </View>
            </React.Fragment>
          );
        }}
      />

      <FabButton title={"+"} onPress={() => handleSnapPress(1)}></FabButton>

      <BottomSheet sheetRef={sheetRef} setTodos={setTodos} todos={todos} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    paddingTop: 75,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    fontSize: size * 2,
    fontWeight: "bold",

    fontSize: size * 2,
    fontWeight: "bold",
    fontFamily: "Poppins_500Medium",
  },

  tasksContainer: {
    // backgroundColor: "#000",
    flexDirection: "column",
    // alignItems: "center",
    width: "100%",

    borderRadius: 10,
    padding: 10,
    marginVertical: 15,

    flex: 1,
  },

  tasksText: {
    fontSize: size - 2,
    fontWeight: "500",
    color: "#737373",
    marginLeft: 13,
  },

  tasksTime: {
    fontSize: size - 7,
    fontWeight: "500",
    color: "#A3A3A3",
    marginLeft: 13,
  },

  dateText: {
    fontSize: size * 1.1,
    fontWeight: "normal",
    marginTop: 10,
    fontFamily: "Poppins_400Regular",
  },
});

export default Task;
