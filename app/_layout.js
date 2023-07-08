import { Stack } from "expo-router";

import { Amplify } from 'aws-amplify';
import awsExports from '../src/aws-exports'; 
import { Authenticator } from "@aws-amplify/ui-react-native";
export default function Layout() {

Amplify.configure(awsExports);

  return (


    <Authenticator.Provider>
      <Authenticator
      
      components={{
        SignIn: (props) => (
          <Authenticator.SignIn {...props} hideSignUp />
        ),
      }}
    
      >
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
    </Authenticator>
    </Authenticator.Provider>

  );
}
