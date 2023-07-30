import React, { useCallback, useRef, useMemo } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { FullWindowOverlay } from "react-native-screens";
import { Portal } from "@gorhom/portal";
import CustomText from "../Text/text";

const Index = ({ sheetRef }) => {
  // hooks

  // variables
  const snapPoints = useMemo(() => ["1%", "60%", "60%"], []);

  // callbacks

  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={1}
        appearsOnIndex={2}
      />
    ),
    []
  );

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  // render
  return (
    // <View style={styles.container}>
    //   <Button title="Snap To 90%" onPress={() => handleSnapPress(2)} />
    //   {/* <Button title="Snap To 50%" onPress={() => handleSnapPress(1)} />
    //   <Button title="Snap To 25%" onPress={() => handleSnapPress(0)} /> */}
    //   <Button title="Close" onPress={() => handleClosePress()} />

    // <View style={styles.container}>

    <Portal>
      <FullWindowOverlay style={StyleSheet.absoluteFill}>
        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          onChange={handleSheetChange}
          backdropComponent={renderBackdrop}
          style={{ zIndex: 1000, padding: 10 }}
        >
          <BottomSheetView>
            <CustomText style={styles.header}>Create a task</CustomText>

            <View>
              <CustomText style={styles.label}>Task title</CustomText>

              <BottomSheetTextInput
                style={styles.input}
                placeholder="add a task"
              />
            </View>



            
            <View>
              <CustomText style={styles.label}>Hour</CustomText>

              <BottomSheetTextInput
                style={styles.input}
                placeholder="add a task"
              />
            </View>
          </BottomSheetView>
        </BottomSheet>
      </FullWindowOverlay>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 200,
    backgroundColor: "white",

    zIndex: 1000,
  },

  header: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },

  input: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 16,
    lineHeight: 20,
    padding: 10,
    backgroundColor: "#fff",
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    marginTop: 10,
  },
});

export default Index;
