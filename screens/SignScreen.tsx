import React from "react";
import { PersonaRegistrar, RootStackScreenProps } from "../types";
import { Button, TextInput } from "react-native-paper";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { SafeAreaView } from "react-native-safe-area-context";
import PassValidation from "../components/PassValidation";
import FechaNac from "../components/FechaNac";
import { registrarUsuario } from "../tmp/UserService";

const SignScreen = ({ navigation }: RootStackScreenProps<"SignScreen">) => {
  const [state, setState] = React.useState({} as PersonaRegistrar);

  async function registrar() {
    // FORMLATER
    //   const fechaForm = `${person.fechaNac.getDay()}/${person.fechaNac.getMonth()}/${person.fechaNac.getDate()}`;
    const fechaForm = "1/1/1920";

    registrarUsuario({
      nombre: state.nom,
      apellido: state.ape,
      correo: state.mail,
      password: state.pass,
      telefono: state.tel,
      fechaNac: fechaForm,
    })
      .then((response) => {
        if (response.success && response.token && response.uuid) {
          // TODO: SAVE SHIT

          // console.log(response.token);
          // console.log(response.uuid);
          AsyncStorage.setItem("@uuid", response.uuid);
          AsyncStorage.setItem("@token", response.token);
         

          navigation.navigate('Root')

        
        } else {
          // TODO: SHOW ERROR
       
          console.log(response.error);
        }
      })
      .catch((e) => {
        console.log(JSON.stringify(e));
      });
  }
  return (
    <SafeAreaView>
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
     <TextInput
        mode="outlined"
        label="Fecha"
        placeholder="Fecha de nacimiento"
        value={state.fechaNac}
        onChangeText={(e) => setState({ ...state, fechaNac: e.valueOf() })}
      />
      <PassValidation
        pass={state.pass}
        rePass={state.rePass}
        validacion={state.validacion}
        setPass={(e) => setState({ ...state, pass: e })}
        setRepass={(e) => setState({ ...state, rePass: e })}
        setValidacion={(e) => setState({ ...state, validacion: e })}
      />

      {/* <FechaNac
        setDate={(e) => setState({ ...state, fechaNac: e })}
        date={state.fechaNac}
      /> */}

      <Button mode="contained" onPress={() => registrar()}>
        Registrar
      </Button>
    </SafeAreaView>
  );
};

export default SignScreen;
