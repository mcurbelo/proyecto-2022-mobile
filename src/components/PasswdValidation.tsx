import { View, Text, SafeAreaView } from "react-native";
import React, { FC, useEffect, useState } from "react";
import SingleInput from "./SingleInput";

interface Props {
  pass: string;
  setPass: (text: string) => void;

  rePass: string;
  setRepass: (text: string) => void;

  validacion: boolean;
  setValidacion: (valido: boolean) => void;
}
// TODO: Intente tipo asi para evitar decir "TU PASS ESTA MAL" pero como que  perdi un poquito como
// enum ResultadoValidacion {
//   duplicadoError = 0,
//   minimoError = 1,
//   correcto = 2,
// }

const PasswdValidation: FC<Props> = (props) => {

  useEffect(() => {
    

  // Esto se autocompleto
    // return () => {
    // }
    // ""
    // Ejecutar luego de renderizar. Evita problemas con renderizaciones de mas abajo
    val()


    

  }, [props.pass , props.rePass])
  
  const val = () => {
    // TODO: Aca podemos poner todo lo que sea validificar las contraseñas.
    // por ahora solo dejo pass=repass como prueba.
    if (props.pass === props.rePass) props.setValidacion(true);
    else props.setValidacion(false);
  };

  return (
    <View>
      <SingleInput
        placeholder="Ingrese su contraseña"
        value={props.pass}
        setValue={props.setPass}
        secureTextEntry={true}
      />

      <SingleInput
        placeholder="Vuelva a ingresar su contraseña"
        value={props.rePass}
        setValue={props.setRepass}
        secureTextEntry={true}
      />
    </View>
  );
};

export default PasswdValidation;
