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

  console.log(todos);

  const styles = StyleSheet.create({
    container: {
      flex: 1,

      padding: 10,
      paddingTop: 75,
    },

    header: {
      fontSize: size * 2,
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notes</Text>

      <Text>{todos.length} todos</Text>

      <Text onPress={() => signOut()}>Log out</Text>
    </View>
  );
}
