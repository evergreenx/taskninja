import { Stack } from "expo-router";
import { View, Text } from "react-native";

import { Amplify } from "aws-amplify";
import awsExports from "../src/aws-exports";
import {
  Authenticator,
  useTheme,
  ThemeProvider,
  defaultDarkModeOverride,
} from "@aws-amplify/ui-react-native";

const theme = {
  tokens: {
    colors: {
      font: {
        primary: "black",
      },
    },
  },
};

export default function Layout() {
  Amplify.configure(awsExports);

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

  const MySignIn = () => {
    return (
      <View>
        <Text>My Sign In</Text>
      </View>
    );
  };
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
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </Authenticator>
      </Authenticator.Provider>
    </ThemeProvider>
  );
}
