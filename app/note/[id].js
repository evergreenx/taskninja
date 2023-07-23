import { View, Text } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";

import { useSearchParams } from "expo-router";
import Button from "../../src/components/atoms/Button/button";

export default function Edit() {


    const { name } = useSearchParams();
  return (
    <View>
      <Stack.Screen
        options={{
          headerStyle: {
            // backgroundColor: "#fff",
            shadowColor: "transparent",
          },

          headerShadowVisible: false,
          headerShown: true,
          title: "",
        }}
      />
      <Text>{name}</Text>
    </View>
  );
}
