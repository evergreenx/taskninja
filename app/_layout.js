import { Stack, SplashScreen } from "expo-router";
import { View, Text } from "react-native";
import { React, useState, useEffect } from "react";
import { TabsLayout } from "../app/(tabs)/_layout.js";

import { Amplify, AuthModeStrategyType } from "aws-amplify";
import awsExports from "../src/aws-exports";

// import { SplashScreen } from "expo-router";

import {
  Authenticator,
  useTheme,
  ThemeProvider,
  defaultDarkModeOverride,
} from "@aws-amplify/ui-react-native";
import Button from "../src/components/atoms/Button/button.js";

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
    // Perform some sort of async data or asset fetching.
    setTimeout(() => {
      // When all loading is setup, unmount the splash screen component.
      SplashScreen.hideAsync();
      setReady(true);
    }, 1000);
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

  return (
    <ThemeProvider
      theme={{
        tokens: {
          space: {
            brand: {
              10: "{space.xs}",
              20: "{space.sm}",
              40: "{space.md}",
              60: "{space.lg}",
              80: "{space.xl}",
            },
          },

          colors: {
            brand: {
              primary: {
                10: "{colors.black}",
                20: "{colors.black}",
                40: "{colors.black}",
                60: "{colors.black}",
                80: "#000000",
                90: "{colors.black.90}",
                100: "{colors.pink.100}",
              },
            },
          },
        },

        overrides: [defaultDarkModeOverride],
      }}
    >
      <Authenticator.Provider>
        <Authenticator
          // components={{ SignIn: MySignIn }}
          Container={(props) => (
            // reuse default `Container` and apply custom background
            <Authenticator.Container {...props} style={{}} />
          )}
          Header={MyAppHeader}
          components={{
            SignIn: (props) => <Authenticator.SignIn {...props} hideSignUp />,
          }}
        >
          {/* <Button title="Sign Out" onPress={() => signOut()}></Button> */}
          <Stack
            screenOptions={{
              headerShown: false,
            }}
            style={{
              backgroundColor: "red",
              flex: 1,
              width: "100%",
              padding: 10,
              fontFamily: "Poppins_600Regular",
            }}
            initialRouteName="(tabs)"
          >
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen name="newNote" />
          </Stack>
        </Authenticator>
      </Authenticator.Provider>
    </ThemeProvider>
  );
}
