import { StyleSheet, View, Text } from "react-native";
import React, { FC, Dispatch, SetStateAction } from "react";
import {TextInput} from 'react-native-paper'

interface Props {
  placeholder: string;
  secureTextEntry?: boolean;
  value: string;
  setValue: (text: string) => void;

  // onChange?: (val: string) => void;

  // TODO: Estos son cosas del TextInput pero son como que muy poco importantes por ahora a mi parecer
  // autoComplete?: string;
  // kbType?: "default" | "numeric" | "email-address";
  // textCType?: "emailAddress" | "familyName";
  // label: string;
}

const SingleInput: FC<Props> = (props) => {
  // const {type }= this.props

  return (
    <View style={styles.root}>
      <TextInput
        // TODO: Estos son cosas del TextInput pero son como que muy poco importantes por ahora a mi parecer
        // auto-autoComplete={props.autoComplete}
        // keyboardType={props.kbType}
        // textContentType={props.textCType}

        placeholder={props.placeholder}
        style={styles.input}
        textAlign="center"
        secureTextEntry={props.secureTextEntry}
        value={props.value}
        onChangeText={props.setValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    // alignItems: "center",
  },
  input: {
  //   // TODO: Aca quisiera poner tipo screenwidth* 0.8 para estar masomenos igual en todos los lados o algo asi no se.. pero no encontre como meterle una variable aca el metodo style={styles.input(aca una var)} no sirvio
  //   width: 300,
  //   padding: 10,
  //   borderStyle: "solid",
  //   borderWidth: 1,
  //   backgroundColor: "white",
  //   borderRadius: 25,
  //   fontSize: 20,
  //   marginTop: 20,
  //   marginBottom: 20,
  },
  text: {
    // fontSize: 20,
    // alignItems: "center",
    // padding: 10,
  },
});
export default SingleInput;
