import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { React, useState, useEffect } from "react";

import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";


// SplashScreen.preventAutoHideAsync();

export default function Page() {
  const { signOut, user, isPending } = useAuthenticator();

  // const [isReady, setReady] = useState(true);
  // useEffect(() => {
  //   // Perform some sort of async data or asset fetching.
  //   setTimeout(() => {
  //     // When all loading is setup, unmount the splash screen component.
  //     SplashScreen.hideAsync();
  //     setReady(true);
  //   }, 1000);
  // }, []);

  if (isPending) {
    return <Text>Loading...</Text>;
  }

  console.log(user);
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.subtitle}>{user.attributes.nickname}.</Text>

        <TouchableOpacity onPress={() => signOut()}>
          <Text>Sign out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
