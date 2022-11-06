import { View, Text, SafeAreaView } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { TextInput } from "react-native-paper";

interface Props {
  pass: string;
  setPass: (text: string) => void;

  rePass: string;
  setRepass: (text: string) => void;

  validacion: boolean;
  setValidacion: (valido: boolean) => void;
}


const PassValidation: FC<Props> = (props) => {
  useEffect(() => {
    // Esto se autocompleto
    // return () => {
    // }
    // ""
    // Ejecutar luego de renderizar. Evita problemas con renderizaciones de mas abajo
    val();
  }, [props.pass, props.rePass]);

  const val = () => {
    // TODO: Aca podemos poner todo lo que sea validificar las contraseñas.
    // Va pa fuera luego
    if (props.pass === props.rePass) props.setValidacion(true);
    else props.setValidacion(false);
  };

  return (
    <View>
      <TextInput
        placeholder="Ingrese su contraseña"
        secureTextEntry={true}
        value={props.pass}
        onChangeText={props.setPass}
        mode="outlined"
        label="Password"
      />
      <TextInput
        placeholder="Vuelva a ingresar su contrasena"
        secureTextEntry={true}
        value={props.rePass}
        onChangeText={props.setRepass}
        mode="outlined"
        label="Password again"
      />

   
    </View>
  );
};

export default PassValidation;
