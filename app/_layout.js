import { Stack, SplashScreen } from "expo-router";
import { View, Text } from "react-native";
import { React, useState, useEffect } from "react";
import { TabsLayout } from "../app/(tabs)/_layout.js";

import { Amplify, AuthModeStrategyType } from "aws-amplify";
import awsExports from "../src/aws-exports";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Onboarding from "react-native-onboarding-swiper";
// import { SplashScreen } from "expo-router";

import {
  Authenticator,
  useTheme,
  ThemeProvider,
  defaultDarkModeOverride,
} from "@aws-amplify/ui-react-native";
import Button from "../src/components/atoms/Button/button.js";
import OnboardingPage from "../app/onboarding/index.js";

import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";

const theme = {
  tokens: {
    colors: {
      font: {
        primary: "black",
      },
    },
  },
};

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [isReady, setReady] = useState(false);
  Amplify.configure({
    ...awsExports,
    DataStore: {
      authModeStrategyType: AuthModeStrategyType.MULTI_AUTH,
    },
  });

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const onboardingCompleted = await AsyncStorage.getItem(
          "onboardingCompleted"
        );
        if (onboardingCompleted !== null) {
          // Onboarding has been completed previously, skip onboarding
          setReady(true);
        } else {
          // Onboarding not completed yet
          setTimeout(() => {
            // When all loading is set up, unmount the splash screen component.
            SplashScreen.hideAsync();
            setReady(true);
          }, 1000);
        }
      } catch (error) {
        console.error("Error checking onboarding status:", error);
      }
    };

    checkOnboardingStatus();
  }, []);
  const {
    tokens: { space, fontSizes, colors },
  } = useTheme();


  const MyAppHeader = () => {
    return (
      <View>
        <Text
          style={{
            fontSize: fontSizes.xxl,
            padding: space.xl,
            textAlign: "center",
          }}
        >
          Welcome to TaskNinja
        </Text>
      </View>
    );
  };

  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });

  if (!fontsLoaded) {
    return null;
  }

  const toastConfig = {
    taskToast: ({ text1, text2 }) => (
      <View
        style={{
          height: 60,
          paddingHorizontal: 10,
          width: "80%",
          backgroundColor: "black",
          borderRadius: 10,
          marginHorizontal: 10,
        }}
      >
        <Text
          style={{
            color: "white",
            fontFamily: "Poppins_600Regular",
            fontSize: 12,
            padding: 10,
          }}
        >
          {text1}
        </Text>
        <Text
          style={{
            color: "white",
            fontFamily: "Poppins_600Regular",
            fontSize: 10,
            paddingHorizontal: 10,
          }}
        >
          {text2}
        </Text>
      </View>
    ),
  };

  return (
    <>
      {!isReady ? (
        <Text>Loading</Text>
      ) : (
        // <ThemeProvider
        //   theme={{
        //     tokens: {
        //       space: {
        //         brand: {
        //           10: "{space.xs}",
        //           20: "{space.sm}",
        //           40: "{space.md}",
        //           60: "{space.lg}",
        //           80: "{space.xl}",
        //         },
        //       },

        //       colors: {
        //         brand: {
        //           primary: {
        //             10: "{colors.black}",
        //             20: "{colors.black}",
        //             40: "{colors.black}",
        //             60: "{colors.black}",
        //             80: "#000000",
        //             90: "{colors.black.90}",
        //             100: "{colors.pink.100}",
        //           },
        //         },
        //       },
        //     },

        //     overrides: [defaultDarkModeOverride],
        //   }}

    
        <OnboardingPage />
      )}

      <Toast config={toastConfig} />
    </>
  );
}
