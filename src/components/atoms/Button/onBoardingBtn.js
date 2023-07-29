import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import CustomText from "../Text/text";

const OnBoardingBtn = ({ title, onPress, isBGDARK }) => {
  const buttonStyle = isBGDARK ? styles.darkButton : styles.lightButton;
  const textColor = isBGDARK ? styles.darkButtonText : styles.lightButtonText;

  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <CustomText style={[styles.buttonText, textColor]}>{title}</CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "80%",
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 18,
  },
  darkButton: {
    backgroundColor: "#000000",
  },
  lightButton: {
    backgroundColor: "#ffffff",
  },
  buttonText: {
    textAlign: "left",
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
  },
  darkButtonText: {
    color: "white",
  },
  lightButtonText: {
    color: "black",
  },
});

export default OnBoardingBtn;
