import { View, Text, Pressable, StyleSheet } from "react-native";
import { useState, useEffect } from "react";

import { Link } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAuthenticator } from "@aws-amplify/ui-react-native";

import { Todo } from "../../src/models";

import { DataStore } from "@aws-amplify/datastore";

import { API } from "aws-amplify";
import { listTodos, getTodo } from "../../src/graphql/queries";
export default function Note() {
  const { signOut } = useAuthenticator();

  const [todos, setTodos] = useState([]);

  const size = 20;

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await DataStore.query(Todo);
      setTodos(todos);
    };
    fetchTodos();
  }, []);

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
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Tasks</Text>
        {todos.length > 0 ? (
          <Text>
            {todos.length} Task
            {todos.length > 1 ? <Text>s</Text> : <Text></Text>}
          </Text>
        ) : (
          <Text>0 Task</Text>
        )}
      </View>

      <Text onPress={() => signOut()}>Log out</Text>
    </View>
  );
}
