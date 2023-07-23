import { View, Text, Pressable, StyleSheet } from "react-native";
import { useState, useEffect } from "react";

import { Link } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAuthenticator } from "@aws-amplify/ui-react-native";

import { Todo } from "../../src/models";

import { DataStore } from "@aws-amplify/datastore";
import { FlashList } from "@shopify/flash-list";

import { API } from "aws-amplify";
import { listTodos, getTodo } from "../../src/graphql/queries";
import FabButton from "../../src/components/atoms/Button/fabButton";
import CustomCheckbox from "../../src/components/atoms/CheckBox/checkbox";
import CustomText from "../../src/components/atoms/Text/text";
import {
  format,
  formatISO,
  isToday,
  isYesterday,
  formatDistanceToNow,
} from "date-fns";

const size = 20;

const sampleTasks = [
  {
    id: 1,
    title: "Buy groceries",
    description: "Milk, eggs, bread, and fruits",
    completed: false,
    createdAt: "2023-07-23T08:00:00Z",
  },
  {
    id: 2,
    title: "Finish project report",
    description: "Deadline is next week",
    completed: true,
    createdAt: "2023-07-22T10:15:00Z",
  },
  {
    id: 3,
    title: "Go for a run",
    description: "Run for 30 minutes in the park",
    completed: false,
    createdAt: "2023-07-21T15:30:00Z",
  },
  {
    id: 4,
    title: "Call mom",
    description: "Wish her a happy birthday",
    completed: true,
    createdAt: "2023-07-20T16:45:00Z",
  },
  {
    id: 5,
    title: "Attend meeting",
    description: "Discuss project updates",
    completed: false,
    createdAt: "2023-07-19T09:30:00Z",
  },
  {
    id: 6,
    title: "Pay utility bills",
    description: "Electricity and water bills",
    completed: false,
    createdAt: "2023-07-18T14:00:00Z",
  },
  {
    id: 7,
    title: "Read a book",
    description: "Choose from the reading list",
    completed: false,
    createdAt: "2023-07-17T11:45:00Z",
  },
  {
    id: 8,
    title: "Write blog post",
    description: "Share recent experiences",
    completed: false,
    createdAt: "2023-07-16T12:30:00Z",
  },
  {
    id: 9,
    title: "Exercise at the gym",
    description: "Cardio and strength training",
    completed: true,
    createdAt: "2023-07-15T17:15:00Z",
  },
  {
    id: 10,
    title: "Clean the house",
    description: "Vacuum and dusting",
    completed: true,
    createdAt: "2023-07-14T13:00:00Z",
  },
];

function Note() {
  const [todos, setTodos] = useState([]);

  const size = 20;

  const fetchTodos = async () => {
    const tasks = await DataStore.query(Todo, Predicates.ALL, {
      sort: (s) => s.updatedAt(SortDirection.DESCENDING),
    });

    const checkOwner = tasks.filter(
      (note) => Auth.user.attributes.sub === note.owner
    );

    opacity.value = withTiming(1, {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    });

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

  // format date
  const formatDate = (date) => {
    if (isToday(date)) {
      return "Today";
    } else if (isYesterday(date)) {
      return "Yesterday";
    } else {
      return formatDistanceToNow(date, { addSuffix: true });
    }
  };

  const groupTasksByDay = sampleTasks.reduce((acc, order) => {
    const createdAt = new Date(order.createdAt);
    if (!isNaN(createdAt.getTime())) {
      const day = createdAt.toISOString().split("T")[0];
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(order);
      acc[day].sort((a, b) => {
        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();
        return timeA - timeB;
      });
    }
    return acc;
  }, {});

  // get day and notes
  const tasksData = Object.entries(groupTasksByDay).map(([day, tasks]) => ({
    day,
    tasks,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Tasks</Text>
        {sampleTasks.length > 0 ? (
          <Text>
            {sampleTasks.length} task
            {sampleTasks.length > 1 ? <Text>s</Text> : <Text></Text>}
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
        renderItem={({ item }) => {
          console.log(item, "text");
          return (
            <>
              <CustomText style={styles.dateText}>
                {formatDate(new Date(item.day))}
              </CustomText>
              <View style={styles.tasksContainer}>
                <CustomCheckbox />

                {item.tasks.map((task) => (
                  <>

                  <View>
                  <CustomText style={styles.tasksText}>
                      {task.title}
                    </CustomText>

                    <CustomText style={styles.tasksTime}>
                      {formatTime(new Date(task.createdAt), {})}
                    </CustomText>
                  </View>
                  
                  </>
                ))}
                <View></View>
              </View>
            </>
          );
        }}
      />

      <FabButton
        title={"+"}
        onPress={() => router.push("/newNote")}
      ></FabButton>
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
    flexDirection: "row",
    alignItems: "center",
    width: "100%",

    borderRadius: 10,
    padding: 10,
    marginVertical: 5,

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

export default Note;
