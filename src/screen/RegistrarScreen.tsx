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
import { Snackbar, TextInput } from "react-native-paper";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
// import ResultadoValidacion from "../components/PasswdValidation"

import { UserService } from "shopit-shared";
import { enableExpoCliLogging } from "expo/build/logs/Logs";
import FechaNac from "../components/FechaNac";
// intentando hacer import de moment pero no puedo sin arreglar los err

// import {moment} from

const checkPassword = (
  p: string,
  r: string,
  visible: boolean,
  setVisible: (e: boolean) => void
) => {
  if (p !== r) {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAA");
    // WOOP

    return (
      <Snackbar visible={true} onDismiss={() => setVisible(false)}>
        Porfavor asegurese que las contraseñas igual en ambos campos
      </Snackbar>
    );
  }
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
  fechaNac: Date;
};

const RegistrarScreen = () => {
  //TODO:  Nunca mas los use pero sigo queriendo usarlos para los styles ~~~
  const { height, width } = useWindowDimensions();

  // State
  // TODO: Objeto en lugar de tantos states
  // const [mail, setMail] = useState("");
  // const [nom, setNom] = useState("");
  // const [ape, setApe] = useState("");

  // const [pass, setPass] = useState("");
  // const [rePass, setRepass] = useState("");

  // const [validacion, setValidacion] = useState(false);

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
    fechaNac: new Date(),
  } as PersonaRegistrar);

  const [visible, setVisible] = useState(false);

  const doStuff = () => {
    if (!state.validacion) {
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

        <TextInput
          mode="outlined"
          label="Email"
          placeholder="escriba su e-mail aqui."
          value={state.mail}
          onChangeText={(e) => setState({ ...state, mail: e.valueOf() })}
        />
        <TextInput
          mode="outlined"
          label="Nombre"
          placeholder="escriba su nombre aqui."
          value={state.nom}
          onChangeText={(e) => setState({ ...state, nom: e.valueOf() })}
        />
        <TextInput
          mode="outlined"
          label="Apellido"
          placeholder="escriba su apellido aqui."
          value={state.ape}
          onChangeText={(e) => setState({ ...state, ape: e.valueOf() })}
        />

        <PasswdValidation
          pass={state.pass}
          rePass={state.rePass}
          validacion={state.validacion}
          setPass={(e) => setState({ ...state, pass: e })}
          setRepass={(e) => setState({ ...state, rePass: e })}
          setValidacion={(e) => setState({ ...state, validacion: e })}
        />

        {/* TODO REFACTOR THIS SHIT */}
        {/* <BirthInput /> */}
        <FechaNac
          setDate={(e) => setState({ ...state, fechaNac: e })}
          date={state.fechaNac}
        />

        {checkPassword(state.pass, state.rePass, visible, setVisible)}

        {/* 
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
        /> */}
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
