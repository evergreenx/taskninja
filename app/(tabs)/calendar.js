import React, { Component } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import {
  Agenda,
  DateData,
  AgendaEntry,
  AgendaSchedule,
} from "react-native-calendars";

import FabButton from "../../src/components/atoms/Button/fabButton";

const testIDs = {
  menu: {
    CONTAINER: "menu",
    CALENDARS: "calendars_btn",
    CALENDAR_LIST: "calendar_list_btn",
    HORIZONTAL_LIST: "horizontal_list_btn",
    AGENDA: "agenda_btn",
    EXPANDABLE_CALENDAR: "expandable_calendar_btn",
    WEEK_CALENDAR: "week_calendar_btn",
    TIMELINE_CALENDAR: "timeline_calendar_btn",
    PLAYGROUND: "playground_btn",
  },
  calendars: {
    CONTAINER: "calendars",
    FIRST: "first_calendar",
    LAST: "last_calendar",
  },
  calendarList: { CONTAINER: "calendarList" },
  horizontalList: { CONTAINER: "horizontalList" },
  agenda: {
    CONTAINER: "agenda",
    ITEM: "item",
  },
  expandableCalendar: { CONTAINER: "expandableCalendar" },
  weekCalendar: { CONTAINER: "weekCalendar" },
};

export default class AgendaScreen extends Component {
  state = {
    items: {},
  };

  render() {
    return (
      <>
        <Agenda
                 testID={testIDs.agenda.CONTAINER}
                 items={this.state.items}
                 loadItemsForMonth={this.loadItems}
                 selected={new Date()}
                 renderItem={this.renderItem}
                 renderEmptyDate={this.renderEmptyDate}
                 rowHasChanged={this.rowHasChanged}
                 showClosingKnob={true}
                 markingType={'period'}
                
                 markedDates={
                  
                  
                  {
                    '2017-05-08': {textColor: '#43515c'},
                    '2017-05-09': {textColor: '#43515c'},
                    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
                    '2017-05-21': {startingDay: true, color: 'blue'},
                    '2017-05-22': {endingDay: true, color: 'gray'},
                    '2017-05-24': {startingDay: true, color: 'gray'},
                    '2017-05-25': {color: 'gray'},
                    '2017-05-26': {endingDay: true, color: 'gray'}}}
                 // monthFormat={'yyyy'}
                 theme={{calendarBackground: '#fff', agendaKnobColor: 'black' , monthTextColor: 'black', agendaDayTextColor: 'black', agendaDayNumColor: 'black', agendaTodayColor: 'black', agendaKnobColor: 'black'}}
                 renderDay={this.renderDay}
                 hideExtraDays={false}
                 showOnlySelectedDayItems
                 reservationsKeyExtractor={this.reservationsKeyExtractor}
        
                 />
      
        
        

        <FabButton title={"+"} onPress={() => this.addEvent}></FabButton>

        {/* <View style={styles.newEventContainer}>
          <TextInput
            style={styles.input}
            placeholder="Event Name"
            value={this.state.newEventName}
            onChangeText={this.onChangeText}
          />
          <Button title="Add Event" onPress={this.addEvent} />
        </View> */}
      </>
    );
  }

  loadItems = (day) => {
    const items = {};

    setTimeout(() => {
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      this.setState({
        items: newItems,
      });
    }, 1000);
  };

  renderItem = (item, isFirst) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? "black" : "grey";

    return (
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={[styles.item, { height: item.height }]}
        onPress={() => Alert.alert(item.name)}
      >
        <Text style={{ fontSize, color }}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };
  onChangeText = (text) => {
    this.setState({ newEventName: text });
  };
  addEvent = () => {
    const { newEventName, newEventHeight } = this.state;
    const currentDate = this.timeToString(new Date());

    this.setState((prevState) => {
      const updatedItems = { ...prevState.items };
      if (!updatedItems[currentDate]) {
        updatedItems[currentDate] = [];
      }
      updatedItems[currentDate].push({
        name: newEventName,
        height: newEventHeight,
        day: currentDate,
      });
      return { items: updatedItems, newEventName: "", newEventHeight: 50 };
    });
  };
  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  customDay: {
    margin: 10,
    fontSize: 24,
    color: "black",
  },
  dayItem: {
    marginLeft: 34,
  },

  newEventContainer: {
    // position: "absolute",

    bottom: 0,
    left: 0,
    right: 0,
    top: 20,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },
});
