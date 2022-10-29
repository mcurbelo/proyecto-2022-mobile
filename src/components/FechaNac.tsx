import { View, Text, Platform } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { Button, shadow, TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

interface Props {
  setDate: (e: Date) => void;
  date: Date;
}

const FechaNac: FC<Props> = (props) => {
  const [state, setState] = useState({
    date: new Date(),
    show: false,
    text: "SelectedDate",
  });

  const today = new Date();
  const maxDate = new Date(
    today.getDate(),
    today.getMonth(),
    today.getFullYear() - 18
  );

  const dateChange = (e, d) => {
    //   onChange?: (event: DateTimePickerEvent, date?: Date) => void;
    // las fecha es o D o la que ya estaba?
    const currentDate =  d 
    console.log("AAAAAAAAAAA")
    setState({ ...state, show: Platform.OS === "ios" });

    setState({ ...state, date: currentDate });

    let tmpDate = new Date(currentDate);
    const formDate = `${tmpDate.getDate()}/${
      tmpDate.getMonth() + 1
    }/${tmpDate.getFullYear()}`;

    setState({ ...state, text: formDate });

    console.log(formDate);
    

    setState({ ...state, show: false });
  };

  return (
    <View>
      <Button
        mode="outlined"
        onPress={() => setState({ ...state, show: true })}
      >
        Seleccione Fecha
      </Button>
      <TextInput value={state.text} />
      {state.show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={state.date}
          maximumDate={new Date(2000, 1, 1)}
          minimumDate={new Date(1800,1,1)}
          onChange={(e, d) => dateChange}
          // display="spinner"
          mode="date" 

        />
      )}
    </View>
  );
};

export default FechaNac;
