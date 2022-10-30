import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useState } from "react";

import BarraSuperior from "../components/BarraSuperior";
import PasswdValidation from "../components/PasswdValidation";
import { Button, TextInput } from "react-native-paper";
import SnackCheck from "../components/SnackCheck";

import { UserService } from "shopit-shared";
import FechaNac from "../components/FechaNac";
import PersonaRegistrar from '../Data/Persona'


const RegistrarScreen = () => {
  //TODO:  Nunca mas los use pero sigo queriendo usarlos para los styles ~~~
  const { height, width } = useWindowDimensions();

  const [search, setSearch] = useState("");
  const [pressed, wasPressed] = useState(false);

  const [state, setState] = useState({
    mail: "",
    nom: "",
    ape: "",
    tel: "",
    pass: "",
    rePass: "",
    validacion: false,
    pressed: false,
    fechaNac: new Date(),
  } as PersonaRegistrar);
  const disSnack = () => setVisible(true);

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
            label="Nombres"
            placeholder="escriba su nombre aqui."
            value={state.nom}
            onChangeText={(e) => setState({ ...state, nom: e.valueOf() })}
          />
          <TextInput
            mode="outlined"
            label="Apellidos"
            placeholder="escriba su apellido aqui."
            value={state.ape}
            onChangeText={(e) => setState({ ...state, ape: e.valueOf() })}
          />
          <TextInput
            mode="outlined"
            label="Telefono"
            placeholder="escriba su apellido aqui."
            value={state.tel}
            onChangeText={(e) => setState({ ...state, tel: e.valueOf() })}
          />

          <PasswdValidation
            pass={state.pass}
            rePass={state.rePass}
            validacion={state.validacion}
            setPass={(e) => setState({ ...state, pass: e })}
            setRepass={(e) => setState({ ...state, rePass: e })}
            setValidacion={(e) => setState({ ...state, validacion: e })}
          />

          <FechaNac
            setDate={(e) => setState({ ...state, fechaNac: e })}
            date={state.fechaNac}
          />
        
          <SnackCheck
          visible={visible}
          setVisible={setVisible}
          persona={state}
          />

          <Button
          mode="contained"

          >Registrar</Button>
      </ScrollView>
    </SafeAreaView>
  );
};
// onFinish={(values) => {
//   let dateFechaNac = new Date((values.fechaNac as any)._d)
//   let formatted = format(dateFechaNac, "dd/MM/yyyy")
//   UserService.registrarUsuario({
//     nombre: values.nombre,
//     apellido: values.apellido,
//     correo: values.email,
//     password: values.password,
//     telefono: values.telefono,
//     fechaNac: formatted
//   }).then((response) => {
//     if (response.success && response.token && response.uuid) {
//       localStorage.setItem("token", response.token!)
//       localStorage.setItem("uuid", response.uuid)
//       navigate("/")
//     } else {
//       setError({ error: true, message: response.error! })
//     }
//   })
// }}


const registrar = (person: PersonaRegistrar) => {
const fechaForm = ''
  UserService.registrarUsuario({
    nombre: person.nom,
    apellido: person.ape,
  correo: person.mail,
  password:person.pass,
  telefono:person.tel,
  fechaNac: fechaForm
  }).then((response)=> {
    if(response.success && response.token&& response.uuid ){
      // TODO: SAVE SHIT
      // 
      console.log("FUNCIONO");
      
    }
    else {
      // TODO: SHOW ERROR
      console.log("ERRROR");
      
      
    }

    })
}


const styles = StyleSheet.create({
  root: {
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
