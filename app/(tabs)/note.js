import { View, Text, Pressable } from "react-native";

import { Link } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAuthenticator } from "@aws-amplify/ui-react-native";

export default function Note() {
  const { signOut } = useAuthenticator();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Note</Text>
      {/* <Text>{ user && user.name }</Text> */}
      {/* <TouchableOpacity onPress={() => setUser(null)}> */}
      <Text onPress={() => signOut()}>Log out</Text>
      {/* </TouchableOpacity> */}
    </View>
  );
}
