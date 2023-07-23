import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Input from "../src/components/atoms/Input/input";
import { Note } from "../src/models";
import { DataStore } from "@aws-amplify/datastore";
import { Stack, useRouter } from "expo-router";
import Button from "../src/components/atoms/Button/button";

// import {actions, RichEditor, RichToolbar} from "react-native-pell-rich-editor";

// const handleHead = ({tintColor}) => <Text style={{color: tintColor}}>H1</Text>

function NewNote() {
  const router = useRouter();
  // const richText = React.useRef();

  const [inputState, setInputState] = useState({
    topic: "",
    content: "",
  });

  const saveNote = async () => {
    if (inputState.topic !== "" && inputState.content !== "") {
      const newnote = await DataStore.save(
        new Note({
          topic: inputState.topic,
          content: inputState.content,
        })
      );

      console.log(newnote);
    }
  };

  //   useEffect(() => {
  //     saveNote();
  //   }, []);

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#fff",
            shadowColor: "transparent",
          },

          headerRight: () => (
            <Button
              title="Save"
              onPress={() => {
                saveNote()
                  .then(() => {
                    router.push("/note");
                  })
                  .catch((err) => {
                    alert(err);
                  });

                // router.push("/note");
              }}
            ></Button>
          ),
          headerShadowVisible: false,
          headerShown: true,
          title: "",
        }}
      />

      <View style={styles.container}>
        <View style={styles.inputs}>
          <Input
            placeholder="Title"
            value={inputState.topic}
            onChangeText={(text) => {
              setInputState({ ...inputState, topic: text });
            }}
          />

          <Input
            placeholder="Content"
            value={inputState.content}
            onChangeText={(text) => {
              setInputState({ ...inputState, content: text });
            }}
          />
        </View>

        {/* <SafeAreaView>
      <ScrollView>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}	style={{ flex: 1 }}>
          <Text>Description:</Text>
          <RichEditor
              ref={richText}
              onChange={ descriptionText => {
                  console.log("descriptionText:", descriptionText);
              }}
          />
        </KeyboardAvoidingView>
      </ScrollView>

      <RichToolbar
        editor={richText}
        actions={[ actions.setBold, actions.setItalic, actions.setUnderline, actions.heading1 ]}
        iconMap={{ [actions.heading1]: handleHead }}
      />
    </SafeAreaView> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },

  inputs: {
    padding: 10,
    paddingTop: 75,
  },
});

export default NewNote;
