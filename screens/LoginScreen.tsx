import { Text, View } from "../components/Themed";
import React from "react";
import { RootStackScreenProps } from "../types";
import { Platform, StyleSheet } from "react-native";
import { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import { iniciarSesion } from "../tmp/UserService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ({ navigation }: RootStackScreenProps<"LoginScreen">) {
  const [state, setState] = useState({
    mail: "",
    pass: "",
    press: false,
  });

  const attemptLogin = async () => {
    console.log("AAAAAAAAAAA");

    iniciarSesion(state.mail, state.pass).then((v) => {
      console.log(`${state.mail} ${state.pass}`);
      if (v.uuid && v.token) {
        AsyncStorage.setItem("@uuid", v.uuid);
        AsyncStorage.setItem("@token", v.token);
        navigation.navigate("Root");
      }
    });
  };

  return (
    // <View style={styles.container}>
    <View>
      <TextInput
        mode="outlined"
        label="Email"
        placeholder="escriba su e-mail aqui."
        value={state.mail}
        onChangeText={(e) => setState({ ...state, mail: e.valueOf() })}
      />

      <TextInput
        mode="outlined"
        label="Password"
        placeholder="escriba su contraseña aqui."
        value={state.pass}
        secureTextEntry={true}
        onChangeText={(e) => setState({ ...state, pass: e.valueOf() })}
      />

      <Button
        mode="contained"
        disabled={!(state.mail != "" && state.pass != "")}
        onPress={() => attemptLogin()}
      >
        Press
      </Button>
    </View>
  );
}
// TODO: Sacar pa fuera tal vez
