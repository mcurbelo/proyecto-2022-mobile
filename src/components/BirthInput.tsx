import { View, StyleSheet, Platform } from "react-native";
import React, { FC, useState } from "react";
import { Button, Text } from "@react-native-material/core";
import DateTimePicker from "@react-native-community/datetimepicker";
const BirthInput = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [text, setText] = useState("Selected Date");

  // const showMode = () => setShow(true);

  const today = new Date();
  const maxDate = new Date(
    today.getDate(),
    today.getMonth(),
    today.getFullYear() - 18
  );

  new Date()
  interface OnCh {
    event: Event;
    selectedDate: Date;

    onChange: () => void;
  }

  // TODO: aca el onChange() me esta fallando algo
  const onChange: FC<OnCh> = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    // TODO: He visto en unos cuantos lados como este datepicker jode con la plataforma, tu dime si funciona
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    let tmpDate = new Date(currentDate);
    let formDate = `${tmpDate.getDate()}/${
      tmpDate.getMonth() + 1
    }/${tmpDate.getFullYear()}`;
    setText(formDate);
    console.log(formDate);
  };

  return (
    <View style={styles.root}>
      <Text variant="h4">{text}</Text>
      <Button
        variant="outlined"
        title="SELECCIONAR FECHA"
        onPress={() => setShow(true)}
      />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          // TODO: Esto deberia estar funcionando.... Me lleva a 1922 
          minimumDate={new Date(1, 1, 1900)}
          maximumDate={new Date(today.getDate(), today.getMonth(), today.getFullYear() -18)}

          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({root:{textAlign:'center'}, text: {} });
export default BirthInput;