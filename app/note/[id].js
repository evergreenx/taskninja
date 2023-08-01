import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Stack, useRouter } from "expo-router";
import { useSearchParams } from "expo-router";
import Button from "../../src/components/atoms/Button/button";
import CustomText from "../../src/components/atoms/Text/text";

export default function Edit() {
  const { name, content } = useSearchParams();

  const handleSave = () => {
    // Implement the logic for saving the edited content here
    // For example, you can use the name state to update the content in the database
    console.log("Saving changes...");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Stack.Screen
        options={{
          headerStyle: {
            // backgroundColor: "#fff", // Uncomment this line to set the background color of the header
            shadowColor: "transparent",
          },
          headerShadowVisible: false,
          headerShown: true,
          title: "Edit Page", // Set your title here
        }}
      />

      {/* Content */}
      <Text style={styles.text}>{name}</Text>

      <CustomText>{content}</CustomText>

      {/* Button */}

      {/* Add more content or components as needed */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff", // Set your desired background color for the page
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
