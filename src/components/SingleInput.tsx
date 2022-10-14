import { StyleSheet, View, Text, TextInput } from "react-native";
import React, { FC } from "react";

interface Props {
  placeholder: string;
  onChangeText?: (text: string) => void;
  securityTextEntry?: boolean;

  autoComplete?: string;
  // TODO: por ahora? para que el Kbtype no me de error Por ahora se que es overkill...
  kbType?: "default" | "numeric" | "email-address";
  textCType?: "emailAddress" | "familyName";
  label: string
}

const SingleInput: FC<Props> = (props) => {
  // const {type }= this.props
  return (
    // auto-autoComplete="emailAddress" keyboardType="email-address" textContentType="emailAddress"
    <View style={styles.root}>
      <Text style={styles.text}>{props.label}</Text>
      <TextInput
        auto-autoComplete={props.autoComplete}
        keyboardType={props.kbType}
        placeholder={props.placeholder}
        textContentType={props.textCType}
        style={styles.input}
        textAlign="center"
        
        
      />

    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
  },
  input: {
    // TODO: Aca quisiera poner tipo screenwidth* 0.8 para estar masomenos igual en todos los lados o algo asi no se.. pero no encontre como meterle una variable aca el metodo style={styles.input(aca una var)} no sirvio
    width: 300,
    padding: 10,
    borderStyle: "solid",
    borderWidth: 1,

    backgroundColor: "white",

    borderRadius: 100,

    fontSize: 23
  },
  text: {
    fontSize: 23,
    alignItems: "center",
    padding: 10

  }

});
export default SingleInput;
