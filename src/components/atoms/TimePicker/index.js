import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Button,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { Portal } from "@gorhom/portal";
import { FullWindowOverlay } from "react-native-screens";

export const TimePicker = ({ setHour }) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [mode, setMode] = useState("time");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedValue) => {
    setShow(Platform.OS === "ios");
    if (mode == "date") {
      const currentDate = selectedValue || new Date();
      setDate(currentDate);
      setMode("time");
      setShow(Platform.OS !== "ios");
    } else {
      const selectedTime = selectedValue || new Date();
      setTime(selectedTime);
      setHour(selectedTime);
      setShow(Platform.OS === "ios");
      setMode("date");
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("time");
  };

  return (
    <View style={{}}>
      <TouchableOpacity onPress={showDatepicker}>
        <Text style={{ fontSize: 24 }}>{formatDate(date, time)}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          minimumDate={new Date()}
          maximumDate={new Date(2021, 12, 31)}
          onTouchCancel={() => {
            setShow(false);


          }}

          // collapsable={true}
          // style={{ width: 200, height: 200, zIndex: 1000 }}
          value={time}
          mode={"time"}
          is24Hour={false}
          display="spinner"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const formatDate = (date, time) => {
  return `${time.getHours()}:${time.getMinutes()}`;
};
