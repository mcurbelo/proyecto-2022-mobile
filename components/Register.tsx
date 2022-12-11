import React, { useState } from "react";
import { Button, View } from "react-native";
import { TextInput } from "react-native-paper";
import FechaNac from "./FechaNac";
import { registrarUsuario } from "../tmp/UserService";
import AsyncStorage from "@react-native-async-storage/async-storage";

type RegistrarUsuarioState = {
  correo: string;
  nombre: string;
  apellido: string;
  password: string;
  repeatPassword: string;
  telefono: string;
  fechaNac: string;
  showDatePicker: boolean;
};

type RegistrarUsuarioProps = {
  onSuccess: () => void;
  onFailure: () => void;
};

const RegisterUser = (props: RegistrarUsuarioProps) => {
  const [state, setState] = useState({
    showDatePicker: false,
  } as RegistrarUsuarioState);

  const submitUser = async () => {
    // let token = await AsyncStorage.getItem("@token");
    // if (!token) return;
    registrarUsuario({
      apellido: state.apellido,
      correo: state.correo,
      nombre: state.nombre,
      password: state.password,
      telefono: state.telefono,
      fechaNac: state.fechaNac,
    })
      .then(async (response) => {
        if (response.success && response.token && response.uuid) {
          await AsyncStorage.setItem("@token", response.token);
          await AsyncStorage.setItem("@uuid", response.uuid);
          props.onSuccess();
        } else {
          props.onFailure();
        }
      })
      .catch((error) => {
        props.onFailure();
      });
  };

  return (
    <View>
      <TextInput
        activeOutlineColor="#a8a7a7"
        mode="outlined"
        placeholder="pgomez@shopnow.com"
        label={"Correo"}
        onChangeText={(e) => setState({ ...state, correo: e.valueOf() })}
      />
      <TextInput
        activeOutlineColor="#a8a7a7"
        mode="outlined"
        placeholder="Pedro"
        label={"Nombre"}
        onChangeText={(e) => setState({ ...state, nombre: e.valueOf() })}
      />
      <TextInput
        activeOutlineColor="#a8a7a7"
        mode="outlined"
        placeholder="Apellido"
        label={"Gomez"}
        onChangeText={(e) => setState({ ...state, apellido: e.valueOf() })}
      />
      <TextInput
        activeOutlineColor="#a8a7a7"
        secureTextEntry
        mode="outlined"
        placeholder="******"
        label={"Contraseña"}
        onChangeText={(e) => setState({ ...state, password: e.valueOf() })}
      />
      <TextInput
        activeOutlineColor="#a8a7a7"
        secureTextEntry
        mode="outlined"
        placeholder="******"
        label={"Repetir Contraseña"}
        onChangeText={(e) =>
          setState({ ...state, repeatPassword: e.valueOf() })
        }
      />
      <TextInput
        activeOutlineColor="#a8a7a7"
        secureTextEntry
        mode="outlined"
        placeholder="099235745"
        label={"Telefono"}
        keyboardType={"number-pad"}
        onChangeText={(e) => setState({ ...state, telefono: e.valueOf() })}
      />
      <FechaNac
        onDateChange={(date) => {
          setState({ ...state, fechaNac: date });
        }}
      />
      <View style={{ height: 8 }} />
      <Button
        title="Confirmar"
        disabled={
          !state.apellido ||
          !state.correo ||
          !state.nombre ||
          !state.fechaNac ||
          state.repeatPassword != state.password
        }
        onPress={() => {
          submitUser();
        }}
      />
    </View>
  );
};

export default RegisterUser;
