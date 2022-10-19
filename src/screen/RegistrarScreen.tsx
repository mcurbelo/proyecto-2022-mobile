import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import SingleInput from "../components/SingleInput";

import DateTimePicker from "@react-native-community/datetimepicker";
import BirthInput from "../components/BirthInput";

import { Button, Text } from "@react-native-material/core";
import BarraSuperior from "../components/BarraSuperior";
import PasswdValidation from "../components/PasswdValidation";
// import ResultadoValidacion from "../components/PasswdValidation"

const checkPassword = (p: string, r: string) => {
  if (p !== r) return false;
};

const RegistrarScreen = () => {
  //TODO:  Nunca mas los use pero sigo queriendo usarlos para los styles ~~~
  const { height, width } = useWindowDimensions();

  // State
  const [mail, setMail] = useState("");
  const [nom, setNom] = useState("");
  const [ape, setApe] = useState("");

  const [pass, setPass] = useState("");
  const [rePass, setRepass] = useState("");

  const [validacion, setValidacion] = useState(false);

  // const [rePass, setRepass] = useState("");

  return (
    <SafeAreaView>
      <BarraSuperior nombre="Registrar" />

      <ScrollView contentContainerStyle={styles.root}>
        {/*  RNFE */}
        <SingleInput
          placeholder="EMAIL"
          value={mail}
          setValue={setMail}

          // autoComplete="emailAdress"
          // kbType="email-address"
          // textCType="emailAddress"
          // label="Ingrese su email: "
        />
        <SingleInput placeholder="NOMBRE" value={nom} setValue={setNom} />
        <SingleInput placeholder="Apellido" value={ape} setValue={setApe} />
        {/* TODO: Porque los <Text/> aparecen asi...2 */}
        {!validacion && (
          <Text style={styles.warning}>no wachin la pass esta mal</Text>
        )}
        {/* <SingleInput
          placeholder="Ingrese su contraseña"
          value={pass}
          setValue={setPass}
          secureTextEntry={true}
        />
        <SingleInput
          placeholder="Vuelva a ingresar su contraseña"
          value={rePass}
          setValue={setRepass}
          secureTextEntry={true}
        /> */}

        {checkPassword(pass, rePass) && <Button title="YES" />}
        <PasswdValidation
          pass={pass}
          setPass={setPass}
          rePass={rePass}
          setRepass={setRepass}
          validacion={validacion}
          setValidacion={setValidacion}
        />
        <BirthInput />

        <Button title="Iniciar Sesion" style={styles.btn} />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  root: {
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "space-around",
    // height: "100%",
    // padding: 50,
  },
  warning: {
    // color: "red",
    // alignItems: "center",
  },
  btn: {
    // width: "90%",
  },
});

export default RegistrarScreen;
