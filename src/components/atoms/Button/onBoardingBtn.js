import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import CustomText from "../Text/text";

const onBoardingBtn = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <CustomText style={styles.buttonText}>{title}</CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "80%",

    backgroundColor: "#000000",
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 18,
  },
  buttonText: {
    color: "white",
    textAlign: "left",
    fontSize: 18,
    // fontWeight: "500",
    fontFamily: "Poppins_600SemiBold",
  },
});

export default onBoardingBtn;
