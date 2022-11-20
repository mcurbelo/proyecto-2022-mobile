import React, { useState } from "react";
import { Alert, Button, SafeAreaView, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { Button as PaperButton } from "react-native-paper";
import { Text, View } from "../components/Themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { iniciarSesion } from "../tmp/UserService";
import messaging from "@react-native-firebase/messaging";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";

export default function TabTwoScreen(allProps: any) {
  const [isLogin, setIsLogin] = useState(false);
  const [state, setState] = useState({
    mail: "",
    pass: "",
    isError: false,
  });
  const nav = useNavigation();
  React.useEffect(() => {}, []);

  const LogOut = async () => {
    await AsyncStorage.removeItem("@token");
    await AsyncStorage.removeItem("@uuid");
    allProps.CheckLogged();
  };

  const getToken = async (): Promise<string | null> => {
    let result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS, {
      title: "Se necesitan permisos de Push Notification",
      message: "Necesitamos PN para una mejor experiencia",
      buttonPositive: "OK!",
      buttonNegative: "NO",
    });

    const fcmToken = await messaging().getToken();
    return fcmToken;
  };

  const attemptLogin = async () => {
    let fcmToken = await getToken();
    iniciarSesion(state.mail, state.pass, fcmToken).then(async (v) => {
      if (v.uuid && v.token) {
        await getToken();
        AsyncStorage.setItem("@uuid", v.uuid);
        AsyncStorage.setItem("@token", v.token);
        setState({ ...state, isError: false });
        setIsLogin(false);
        allProps.CheckLogged();
      } else {
        setState({ ...state, isError: true });
      }
    });
  };

  return (
    <SafeAreaView style={{ height: "100%", padding: 15 }}>
      {!allProps.extraProps && (
        <Button title="Ingresar" onPress={() => setIsLogin(true)} />
      )}
      {isLogin && (
        <View style={{ padding: 24 }}>
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

          <PaperButton
            style={{ marginTop: 8, marginBottom: 8 }}
            mode="contained"
            disabled={!(state.mail != "" && state.pass != "")}
            onPress={() => attemptLogin()}
          >
            Ingresar
          </PaperButton>

          {state.isError && (
            <Text>Ha ocurrido un error. Por favor vuelva a intentarlo</Text>
          )}
        </View>
      )}
      {allProps.extraProps && (
        <>
          <Button
            title="Mis Direcciones"
            onPress={() => nav.navigate("ListAddress")}
          />
          <View style={{ margin: 8 }} />
          <Button
            title="Agregar Método de Pago"
            onPress={() => nav.navigate("AddCard")}
          />
          <View style={{ margin: 8 }} />
          <Button title="Salir" onPress={() => LogOut()} />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
