import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CustomCheckbox = ({ isChecked, onToggle }) => {
  // const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxToggle = () => {
    onToggle(!isChecked);
  };

  return (
    <TouchableOpacity
      style={styles.checkboxContainer}
      onPress={handleCheckboxToggle}
    >
      {isChecked && (
        <View style={styles.checkboxChecked}>
          <Text style={styles.checkmark}>&#10003;</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CustomCheckbox;
const styles = StyleSheet.create({
  checkboxContainer: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    width: 20,
    height: 20,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  checkmark: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
