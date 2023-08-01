import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const FabButton = ({ title, onPress, isDark }) => {
  // Use dynamic background color based on isDark prop
  const backgroundColor = !isDark ? "#000000" : "#ffffff";

  const color = !isDark ? "#ffffff" : "#000000";

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: backgroundColor }]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: color }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    zIndex: 20,
    bottom: "15%",
    right: 16,
    borderRadius: 40,
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 40, // Adjust the font size as per your preference
    fontWeight: "200",
  },
});

export default FabButton;
