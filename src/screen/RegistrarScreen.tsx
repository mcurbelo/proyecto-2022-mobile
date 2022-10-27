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

import { Button, Text, TextInput } from "@react-native-material/core";
import BarraSuperior from "../components/BarraSuperior";
import PasswdValidation from "../components/PasswdValidation";
import { Snackbar } from "react-native-paper";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
// import ResultadoValidacion from "../components/PasswdValidation"

import { UserService } from "shopit-shared";
// intentando hacer import de moment pero no puedo sin arreglar los err

// import {moment} from

const checkPassword = (p: string, r: string) => {
  if (p !== r) return false;
};

type PasswordState = {
  password: string;
  repeatPassword: string;
};

type Error = {
  error: boolean;
  message: string;
};

// const registrar = (v) => {

//   let fecha = new Date(v.fecha)
//   // let fechaForm = (fecha, "dd/MM/yyyy")

//   UserService.registrarUsuario({
//     nombre: v.nombre,
//     apellido: v.apellido,
//     correo: v.email,
//     password: v.password,
//     telefono: v.telefono,
//     fechaNac: fechaForm,
//   });
// };

type PersonaRegistrar = {
  mail: string;
  nom: string;
  ape: string;
  pass: string;
  rePass: string;
  validacion: boolean;
  pressed: boolean;
};

const RegistrarScreen = () => {
  //TODO:  Nunca mas los use pero sigo queriendo usarlos para los styles ~~~
  const { height, width } = useWindowDimensions();

  // State
  // TODO: Objeto en lugar de tantos states
  const [mail, setMail] = useState("");
  const [nom, setNom] = useState("");
  const [ape, setApe] = useState("");

  const [pass, setPass] = useState("");
  const [rePass, setRepass] = useState("");

  const [validacion, setValidacion] = useState(false);

  const [search, setSearch] = useState("");
  const [pressed, wasPressed] = useState(false);

  const [state, setState] = useState({
    mail: "",
    nom: "",
    ape: "",
    pass: "",
    rePass: "",
    validacion: false,
    pressed: false,
  } as PersonaRegistrar);

  const doStuff = () => {
    if (!validacion) {
      console.log("HEE HEE");
    }
  };

  // const [rePass, setRepass] = useState("");

  return (
    <SafeAreaView>
      {/* Waspressed queda para que no me joda en el BarraSuperior */}
      <BarraSuperior
        nombre="Registrar"
        wasPressed={wasPressed}
        pressed={pressed}
        tieneSearchBar={false}
      />

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

        <Button
          title="Registrar"
          style={styles.btn}
          onPress={() => doStuff()}
        />
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
    padding: 30,
  },
  warning: {
    // color: "red",
    // alignItems: "center",
  },
  btn: {
    padding: 20,
    margin: 40,
    // width: "90%",
  },
});

export default RegistrarScreen;
