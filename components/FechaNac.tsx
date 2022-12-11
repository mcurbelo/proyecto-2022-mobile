import DateTimePicker from "@react-native-community/datetimepicker";
import React, { FC, useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

interface Props {
  onDateChange?: (date: string) => void;
}

const FechaNac: FC<Props> = (props) => {
  const [state, setState] = useState({
    date: new Date(),
    show: false,
    text: "Fecha de Nacimiento",
  });

  const today = new Date();

  const maxDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  const dateChange = (date: Date | undefined) => {
    const currentDate = date!;
    let tmpDate = new Date(currentDate);
    const formDate = `${tmpDate.getDate()}/${
      tmpDate.getMonth() + 1
    }/${tmpDate.getFullYear()}`;
    setState({ ...state, text: formDate, date: currentDate, show: false });
    props.onDateChange?.(formDate);
  };

  return (
    <View style={{ marginTop: 10 }}>
      <Button
        mode="outlined"
        onPress={() => setState({ ...state, show: !state.show })}
      >
        {state.text}
      </Button>

      {state.show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={state.date}
          maximumDate={maxDate}
          onChange={(e, d) => dateChange(d)}
          mode="date"
        />
      )}
    </View>
  );
};

export default FechaNac;
