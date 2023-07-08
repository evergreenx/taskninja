import { StyleSheet, Text, View , TouchableOpacity } from "react-native";

import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';


export default function Page() {

  const { signOut,user, isPending, } = useAuthenticator();


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
