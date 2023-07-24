import React, { useState, useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useDerivedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { Text, View } from "react-native";

const StickyHeader = ({ title }) => {
  const [scrollY, setScrollY] = useState(0);
  const headerHeight = 100;
  const stickyHeader = useSharedValue(0);
  const showHeader = useState([1, () => {}]);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    const offsetY = event.contentOffset.y;
    stickyHeader.value = offsetY < 0 ? 0 : offsetY > headerHeight ? -headerHeight : -offsetY;
    showHeader.values = [offsetY > headerHeight, () => {}]; // Show header when scroll position is greater than header height
  });

  useEffect(() => {
    stickyHeader.value = -scrollY; // Update sharedValue with the current scroll position
  }, [scrollY, stickyHeader]);

  const hideHeader = useAnimatedScrollHandler(() => {
    showHeader.values[0] = 0; // Hide header when scrolling stops
  });

  const hideHeaderDelay = useDerivedValue(() => {
    // Hide header with a delay of 1.5 seconds after scrolling stops
    return withTiming(showHeader.values[0], { duration: 1500, easing: Easing.linear });
  });

  useEffect(() => {
    hideHeader(); // Call hideHeader when scroll stops
  }, [hideHeader]);

  return (
    <Animated.View
      style={{
        height: headerHeight,
        backgroundColor: "#000",
        transform: [{ translateY: stickyHeader.value }],
        justifyContent: "center",
        alignItems: "center",
        opacity: showHeader.values[0], // Set opacity based on showHeader
      }}
    >
      <Text style={{ color: "#fff" }}>{title}</Text>
    </Animated.View>
  );
};

export default StickyHeader;
