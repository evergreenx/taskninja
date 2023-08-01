import React, { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { FullWindowOverlay } from "react-native-screens";
import { Portal } from "@gorhom/portal";
import CustomText from "../Text/text";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TimePicker } from "../TimePicker";
import RadioButton from "../RadioButton";
import Button from "../Button/button";
import { Todo } from "../../../models";
import { DataStore } from "@aws-amplify/datastore";

const Index = ({ sheetRef, setTodos, todos }) => {
  // hooks
  // variables
  const snapPoints = useMemo(() => [1, "80%"], []);

  // Add states for task title, hour, and today
  const [taskTitle, setTaskTitle] = useState("");
  const [hour, setHour] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [today, setToday] = useState(true);

  // Validation functions
  const isTaskTitleValid = () => {
    return taskTitle.trim() !== "";
  };

  const isHourValid = () => {
    return hour.trim() !== "";
  };

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
      />
    ),
    []
  );

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
    alert("hello");
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  // render
  const handleSaveTask = async () => {
    // Validate task title and hour before saving
    if (taskTitle === "" || hour === "") {
      return;
    }

    // Set loading to true while saving
    setIsLoading(true);

    try {
      await DataStore.save(
        new Todo({
          title: taskTitle,
          createdAt: today
            ? new Date().toISOString() // Use the current date as createdAt
            : new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          completed: false,
        })
      );

      // Clear the input fields
      setTaskTitle("");
      setHour("");
      setToday(true);

      // Close the bottom sheet
      sheetRef.current?.close();
    } catch (error) {
      // Handle any error that occurred during saving
      console.error("Error saving task:", error);
    } finally {
      // Set loading back to false
      setIsLoading(false);
    }
  };

  return (
    <Portal>
      <FullWindowOverlay style={StyleSheet.absoluteFill}>
        <BottomSheet
          enablePanDownToClose={true}
          ref={sheetRef}
          snapPoints={snapPoints}
          onChange={handleSheetChange}
          backdropComponent={renderBackdrop}
          style={{ padding: 10 }}
        >
          <BottomSheetView>
            <CustomText style={styles.header}>Create a task</CustomText>

            <View>
              <CustomText style={styles.label}>Task title</CustomText>
              {/* Use onChangeText to update the taskTitle state */}
              <BottomSheetTextInput
                value={taskTitle}
                style={styles.input}
                placeholder="add a task"
                onChangeText={(text) => setTaskTitle(text)}
              />
            </View>
          </BottomSheetView>

          <CustomText style={styles.label}>Hour</CustomText>

          <View style={{}}>
            <TimePicker hour={hour} setHour={setHour} />
          </View>

          <View>
            <CustomText style={styles.label}>Today</CustomText>

            <RadioButton
              activeBackground="#000"
              inactiveBackground="#fff"
              value={today}
              // Use onValueChange to update the today state
              onValueChange={setToday}
            />

            <CustomText style={{ marginVertical: 30, color: "#3C3C43" }}>
              If you disable today, the task will be considered as tomorrow
            </CustomText>
          </View>

          {/* Save button */}
          <Button onPress={handleSaveTask} title={"Done"}>
            {isLoading ? "Saving..." : "Done"}
          </Button>
        </BottomSheet>
      </FullWindowOverlay>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
