import { View, Text, Pressable } from "react-native";

import { Link } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Task() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Account</Text>
  
      <Text>Log out</Text>

    </View>
  );
}
