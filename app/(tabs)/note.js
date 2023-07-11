import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import { useState, useEffect, useMemo } from "react";
import { FlashList } from "@shopify/flash-list";

import { Link } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAuthenticator } from "@aws-amplify/ui-react-native";

import { Note } from "../../src/models";

import { DataStore } from "@aws-amplify/datastore";

import { API } from "aws-amplify";
import { listTodos, getTodo } from "../../src/graphql/queries";
import Button from "../../src/components/atoms/Button/button";
import FabButton from "../../src/components/atoms/Button/fabButton";
import { format, isToday, isYesterday, formatDistanceToNow } from 'date-fns';

export default function NoteScreen() {
  const { signOut } = useAuthenticator();

  const [notes, setNotes] = useState([]);

  const size = 20;

  useEffect(() => {
    const fetchTodos = async () => {
      const notes = await DataStore.query(Note);
      setNotes(notes);
    };
    fetchTodos();
  }, []);

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
    },

    noteContainer: {
      backgroundColor: "#D9D9D9",
      width: "100%",
      borderRadius: 10,
      padding: 10,
      marginVertical: 5,
      flex: 1,
    },
  });

  // group notes by date

  const groupNotesByDate = (data) => {
    return data.reduce((groups, note) => {
      const date = note.createdAt;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(note);
      return groups;
    }, {});
  };

  // group notes by date and prevent re-renders
  const groupedNotes = useMemo(() => {
    return Object.entries(groupNotesByDate(notes));
  }, [notes]);


  
  const formatDate = (date) => {
    if (isToday(date)) {
      return 'Today';
    } else if (isYesterday(date)) {
      return 'Yesterday';
    } else {
      return formatDistanceToNow(date, { addSuffix: true });
    }
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Notes</Text>
          {notes.length > 0 ? (
            <Text>
              {notes.length} Note
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
            data={groupedNotes}
            estimatedItemSize={100}
            keyExtractor={(item) => item[0]}
            renderItem={({ item }) => {
              const date = item[0];
              const notes = item[1];
              return (
                <>
                  <Text style={styles.dateText}>
                    {formatDate(new Date(date))}
                  </Text>
                  <View style={styles.noteContainer}>
                    {notes.map((note) => (
                      <Text key={note.id} style={styles.noteText}>
                        {note.topic}
                      </Text>
                    ))}
                  </View>
                </>
              );
            }}
          />
        </View>

        <FabButton title={"+"} onPress={() => signOut()}></FabButton>
      </View>
    </>
  );
}
