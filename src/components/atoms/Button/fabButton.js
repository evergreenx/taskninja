import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const FabButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    zIndex: 20,
    // top: '0%',
    bottom: "15%",
    right: 16,
    backgroundColor: "#000000",
    borderRadius: 40,
    width: 56,
    height: 56,
    alignItems: "center",
    // justifyContent: "center",
    elevation: 6,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 50,
    fontWeight: "200",
  },
});

export default FabButton;
