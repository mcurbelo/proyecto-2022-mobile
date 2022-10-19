import { View, Text, SafeAreaView } from "react-native";
import React, { FC, useState } from "react";
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
  const val = () => {
      // TODO: No encontre que otra cosa usamos pero aca supongo que lo ponemos ya sea si necesitamos que la pass tenga mayusculas y bla~~

      // TODO:2 Aca me salta que no puedo actualizar un componente (RegistrarScreen) cuando estoy renderizando este. Pero como lo hago entonces? 
    if (props.pass === props.rePass) props.setValidacion(true);
    else props.setValidacion(false);
  };
  val();

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
