import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function Home() {
  return (
    <>
      <StatusBar backgroundColor="black" />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home</Text>
      </View>
    </>
  );
}
