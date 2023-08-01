import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

import { Auth } from "aws-amplify";
import { Pressable } from "react-native";

export default function Home() {
  return (
    <>
      <StatusBar backgroundColor="black" />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Pressable onPress={() => Auth.signOut()}>
          <Text>logout</Text>
        </Pressable>
      </View>
    </>
  );
}
