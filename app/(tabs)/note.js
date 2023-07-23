import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import { useState, useEffect, useMemo } from "react";
import { FlashList } from "@shopify/flash-list";

import { Link, useRouter } from "expo-router";

import {
  TouchableOpacity,
  useDerivedValue,
} from "react-native-gesture-handler";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { Auth } from "aws-amplify";

import { Note } from "../../src/models";

import {
  DataStore,
  Predicates,
  SortDirection,
  syncExpression,
} from "aws-amplify";
// import { DataStore } from "@aws-amplify/datastore";

import { API } from "aws-amplify";
import { listTodos, getTodo } from "../../src/graphql/queries";
import Button from "../../src/components/atoms/Button/button";
import FabButton from "../../src/components/atoms/Button/fabButton";
import { format, isToday, isYesterday, formatDistanceToNow } from "date-fns";
import CustomText from "../../src/components/atoms/Text/text";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
} from "react-native-reanimated";

const size = 20;

export default function NoteScreen() {
  const { signOut } = useAuthenticator();

  const [notes, setNotes] = useState([]);

  const router = useRouter();

  // const opacity = useSharedValue(0);

  const fetchTodos = async () => {
    const notes = await DataStore.query(Note, Predicates.ALL, {
      sort: (s) => s.updatedAt(SortDirection.DESCENDING),
    });

    const checkOwner = notes.filter(
      (note) => Auth.user.attributes.sub === note.owner
    );

    opacity.value = withTiming(1, {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    });

    setNotes(checkOwner);
  };
  useEffect(() => {
    fetchTodos();

    const subscription = DataStore.observe(Note).subscribe(() => fetchTodos());

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // console.log(notes, "notes");
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

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

  // group note by day
  const groupNoteByDay = notes.reduce((acc, order) => {
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
  const noteData = Object.entries(groupNoteByDay).map(([day, notes]) => ({
    day,
    notes,
  }));

  // const handleCreateNote = async () => {};
  return (
    <>
      <View style={[styles.container]}>
        <View style={styles.headerContainer}>
          <CustomText style={styles.header}>Notes</CustomText>

          {notes.length > 0 ? (
            <Text>
              {notes.length} note
              {notes.length > 1 ? <Text>s</Text> : <Text></Text>}
            </Text>
          ) : (
            <Text>0 Note</Text>
          )}
        </View>

        <View
          style={{
            flex: 1,
            width: "100%",
            padding: 1,
          }}
        >
          <FlashList
            showsVerticalScrollIndicator={false}
            data={noteData} // Use the groupedNotes data
            estimatedItemSize={100}
            keyExtractor={(item) => item.day}
            renderItem={({ item }) => {
              console.log(item, "item");

              return (
                <>
                  <CustomText style={styles.dateText}>
                    {formatDate(new Date(item.day))}
                  </CustomText>
                  <Animated.View style={[styles.noteContainer, animatedStyle]}>
                    {item.notes.reverse().map((note) => (
                      <Pressable
                        style={styles.noteTextContainer}
                        onPress={() => {
                          router.push({
                            pathname: "note/id/",
                            params: { name: note?.topic },
                          });
                        }}
                      >
                        <CustomText key={note.id} style={styles.noteText}>
                          {note.topic}
                        </CustomText>
                        <CustomText style={styles.contentText}>
                          {note.content}
                        </CustomText>
                      </Pressable>
                    ))}
                  </Animated.View>
                </>
              );
            }}
          />
        </View>

        <FabButton
          title={"+"}
          onPress={() => router.push("/newNote")}
        ></FabButton>
        {/* </Link> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    width: "100%",
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
    fontFamily: "Poppins_500Medium",
  },
  dateText: {
    fontSize: size * 1.1,
    fontWeight: "bold",
    marginTop: 10,
    fontFamily: "Poppins_400Regular",
  },
  noteContainer: {
    backgroundColor: "#000",
    width: "100%",

    borderRadius: 10,
    padding: 10,
    marginVertical: 5,

    flex: 1,
  },
  noteText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: size - 4,
    fontWeight: "400",
    marginVertical: 2,
    fontFamily: "Poppins_400Regular",
  },

  noteTextContainer: {
    paddingVertical: size / 3,

    borderBottomColor: "#444444",
    borderBottomWidth: 0.2,
  },

  contentText: {
    color: "grey",
    fontSize: size - 6,
    fontFamily: "Poppins_400Regular",
  },
});
