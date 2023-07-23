import { Tabs } from "expo-router";
import { BlurView } from "expo-blur";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";

import { Platform, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="/note"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        title: "TaskNinja",
        tabBarShowLabel: false,
      }}
      tabBar={(props) =>
        Platform.OS === "ios" ? (
          <BlurView
            style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
            //   tint={colorScheme == "dark" ? "dark" : "light"}
            intensity={95}
          >
            <BottomTabBar {...props} />
          </BlurView>
        ) : (
          <BottomTabBar {...props} />
        )
      }
    >
      <Tabs.Screen
        name="note"
        options={{
          href: {
            pathname: "/note",
          },
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="notes" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="task"
        options={{
          href: {
            pathname: "/task",
          },
          tabBarIcon: ({ color }) => (
            <Octicons name="tasklist" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="calendar"
        options={{
          href: {
            pathname: "/calendar",
          },
          tabBarIcon: ({ color }) => (
            <Octicons name="calendar" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="home"
        options={{
          href: "/home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-settings-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
