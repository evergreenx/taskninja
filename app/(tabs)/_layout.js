import { Tabs } from "expo-router";
import { BlurView } from "expo-blur";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import React from "react";
import { Platform, View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";


const CustomTabBarButton = ({ label, icon, onPress, isFocused, color }) => {
  const activeColor = color;
  const inactiveColor = "#fff";

  const tabColor = isFocused ? activeColor : inactiveColor;
  const borderBottomColor = isFocused ? activeColor : "transparent";
  const borderBottomWidth = isFocused ? 4 : 0;
  const indicatorColor = activeColor;

  const width = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(width.value, {
        duration: 500,
      }),
    };
  });
  const handleLayout = (e) => {
    width.value = e.nativeEvent.layout.width;
  };

 
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,

        

        // backgroundColor: "red",
      }}
    >
      <View style={{ alignItems: "center" }} onLayout={handleLayout}>
        {icon === "note" && (
          <MaterialIcons name="notes" size={24} color={tabColor}  />
        )}
        {icon === "task" && (
          <Octicons name="tasklist" size={24} color={tabColor} />
        )}
        {icon === "calendar" && (
          <Octicons name="calendar" size={24} color={tabColor} />
        )}
        {icon === "home" && (
          <Ionicons name="md-settings-outline" size={24} color={tabColor} />
        )}
        {/* <Text style={{ color: tabColor, marginTop: 8 }}>{label}</Text> */}

        {isFocused && (
          <Animated.View
            style={[
              {
                backgroundColor: indicatorColor,
                height: 4,
                width: 20,
                borderRadius: 2,
                marginTop: 4,
              },
              animatedStyle,
            ]}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default function TabsLayout() {
  const tabColors = ["#fff", "#fff", "#fff", "#fff"]; // Colors for each tab

  return (
    <Tabs
      initialRouteName="/note"
      screenOptions={{
        headerShown: false,
        title: "TaskNinja",
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        },
      }}
      tabBar={(props) =>
        Platform.OS === "ios" ? (
          <BlurView
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: 20,
              backgroundColor: "transparent",
            }}
            intensity={0}
          >
            <View
              style={{
                flexDirection: "row",
                borderTopWidth: 0,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 0.1,

                borderTopColor: "rgba(0,0,0,0.1)",
                marginBottom: 30,
                alignContent: "center",
                alignItems: "center",
                justifyContent: "space-around",
                marginHorizontal: 20,
                borderRadius: 40,
                backgroundColor: "#000",
                zIndex: 1,
                paddingVertical: 10,
              }}
            >
              {props.state.routes.map((route, index) => {
                const isFocused = props.state.index === index;
                const icon = route.name.toLowerCase();
                const color = tabColors[index % tabColors.length];

                const onPress = () => {
                  const event = props.navigation.emit({
                    type: "tabPress",
                    target: route.key,
                    canPreventDefault: true,
                  });

                  if (!isFocused && !event.defaultPrevented) {
                    props.navigation.navigate(route.name);
                  }
                };

                return (
                  <CustomTabBarButton
                    key={route.key}
                    label={route.name}
                    icon={icon}
                    onPress={onPress}
                    isFocused={isFocused}
                    color={color}
                  />
                );
              })}
            </View>
          </BlurView>
        ) : (
          <BlurView
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: 20,
              backgroundColor: "transparent",
            }}
            intensity={0}
          >
            <View
              style={{
                flexDirection: "row",
                borderTopWidth: 0,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 0.1,

                borderTopColor: "rgba(0,0,0,0.1)",
                marginBottom: 30,
                alignContent: "center",
                alignItems: "center",
                justifyContent: "space-around",
                marginHorizontal: 20,
                borderRadius: 40,
                backgroundColor: "#fff",
                paddingVertical: 10,
              }}
            >
              {props.state.routes.map((route, index) => {
                const isFocused = props.state.index === index;
                const icon = route.name.toLowerCase();
                const color = tabColors[index % tabColors.length];

                const onPress = () => {
                  const event = props.navigation.emit({
                    type: "tabPress",
                    target: route.key,
                    canPreventDefault: true,
                  });

                  if (!isFocused && !event.defaultPrevented) {
                    props.navigation.navigate(route.name);
                  }
                };

                return (
                  <CustomTabBarButton
                    key={route.key}
                    label={route.name}
                    icon={icon}
                    onPress={onPress}
                    isFocused={isFocused}
                    color={color}
                  />
                );
              })}
            </View>
          </BlurView>
        )
      }
    >
      {/* Your tab screens... */}
      {/* <Tabs.Screen ... /> */}
      {/* <Tabs.Screen ... /> */}
      {/* <Tabs.Screen ... /> */}
      {/* <Tabs.Screen ... /> */}
    </Tabs>
  );
}
