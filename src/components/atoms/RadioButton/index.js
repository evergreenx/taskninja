import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const CustomSwitch = ({
  value,
  onValueChange,
  activeBackground,
  inactiveBackground,
}) => {
  const animValue = useSharedValue(value ? 1 : 0);

  const toggleSwitch = () => {
    const newValue = !value;
    onValueChange(newValue);
    animValue.value = withTiming(newValue ? 1 : 0, { duration: 500 });
  };

  const switchStyles = useAnimatedStyle(() => ({
    backgroundColor:
      animValue.value === 1 ? activeBackground : inactiveBackground,
    transform: [
      {
        translateX: animValue.value === 1 ? 13 : 0,
      },
    ],
  }));

  return (
    <TouchableOpacity onPress={toggleSwitch}>
      <View style={styles.container}>
        <Animated.View style={[styles.switch, switchStyles]} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 51,
    height: 31,
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  switch: {
    width: 27,
    height: 27,
    borderRadius: 16,
    borderWidth: 2,
  },
});

export default CustomSwitch;
