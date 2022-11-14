import { Text, View } from "../components/Themed";
import React, { useRef } from "react";
import { RootStackScreenProps } from "../types";
import { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import { iniciarSesion } from "../tmp/UserService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ({ navigation }: RootStackScreenProps<"LoginScreen">) {
  const [state, setState] = useState({
    mail: "",
    pass: "",
    isError: false
  });

  const attemptLogin = async () => {
    iniciarSesion(state.mail, state.pass).then((v) => {
      if (v.uuid && v.token) {
        AsyncStorage.setItem("@uuid", v.uuid);
        AsyncStorage.setItem("@token", v.token);
        navigation.navigate("Root");
      } else {
        setState({...state, isError: true})
      }
    })
  };

  return (
    <View
    style={{padding: 24}}
    >
      <TextInput
        returnKeyType="next"
        mode="outlined"
        label="Correo"
        placeholder="pgonzales@shopit.com"
        value={state.mail}
        onChangeText={(e) => setState({ ...state, mail: e.valueOf() })}
      />

      <TextInput
        mode="outlined"
        label="Password"
        placeholder="*********"
        value={state.pass}
        secureTextEntry={true}
        onChangeText={(e) => setState({ ...state, pass: e.valueOf() })}
      />

      <Button
        style={{marginTop: 8, marginBottom: 8}}
        mode="contained"
        disabled={!(state.mail != "" && state.pass != "")}
        onPress={() => attemptLogin()}
      >
        Press
      </Button>

      {state.isError && <Text>Ha ocurrido un error. Por favor vuelva a intentarlo</Text>}
    </View>
  );
}
