import React, { useState } from "react";
import { Alert, Button, SafeAreaView, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { Button as PaperButton } from "react-native-paper";
import { Text, View } from "../components/Themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { iniciarSesion, obtenerInformacion } from "../tmp/UserService";
import messaging from "@react-native-firebase/messaging";
import UserInfo from "../components/UserInfo";
import RegisterUser from "../components/Register";

export default function TabTwoScreen(allProps: any) {
  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [loginState, setLoginState] = useState({
    mail: "",
    pass: "",
    isError: false,
    isLoggedIn: false,
  });

  const nav = useNavigation();
  const LogOut = async () => {
    await AsyncStorage.removeItem("@token");
    await AsyncStorage.removeItem("@uuid");
    await AsyncStorage.removeItem("@userInfo");
    setLoginState({ mail: "", pass: "", isError: false, isLoggedIn: false });
    allProps.CheckLogged();
  };

  const getToken = async (): Promise<string | null> => {
    const fcmToken = await messaging().getToken();
    return fcmToken;
  };

  const fetchInfoUsuario = async (uuid: string, token: string) => {
    obtenerInformacion(uuid, token)
      .then((userInfo) => {
        if (userInfo.success) return;
        debugger;
        AsyncStorage.setItem("@userInfo", JSON.stringify(userInfo));
        setLoginState({
          ...loginState,
          isError: false,
          isLoggedIn: true,
        });
      })
      .catch((error) => {
        debugger;
      });
  };
  const attemptLogin = async () => {
    let fcmToken = await getToken();
    iniciarSesion(loginState.mail, loginState.pass, fcmToken).then(
      async (v) => {
        if (v.uuid && v.token) {
          AsyncStorage.setItem("@uuid", v.uuid);
          AsyncStorage.setItem("@token", v.token);
          setIsLogin(false);
          await fetchInfoUsuario(v.uuid, v.token);
          // obtenerInformacion(v.uuid, v.token)
          //   .then((userInfo) => {
          //     if (userInfo.success) return;
          //     debugger;
          //     AsyncStorage.setItem("@userInfo", JSON.stringify(userInfo));
          //     setLoginState({
          //       ...loginState,
          //       isError: false,
          //       isLoggedIn: true,
          //     });
          //   })
          //   .catch((error) => {
          //     debugger;
          //   });
          allProps.CheckLogged();
        } else {
          setLoginState({ ...loginState, isError: true });
        }
      }
    );
  };

  return (
    <SafeAreaView style={{ height: "100%", padding: 15 }}>
      {!allProps.extraProps && (
        <>
          <Button
            title="Ingresar"
            onPress={() => {
              setIsRegister(false);
              setIsLogin(true);
            }}
          />
          <View
            style={{
              height: 10,
            }}
          />
          <Button
            title="Registrarse"
            onPress={() => {
              setIsLogin(false);
              setIsRegister(true);
            }}
          />
        </>
      )}
      {isLogin && (
        <View style={{ padding: 24 }}>
          <TextInput
            returnKeyType="next"
            mode="outlined"
            label="Correo"
            placeholder="pgonzales@shopnow.com"
            value={loginState.mail}
            onChangeText={(e) =>
              setLoginState({ ...loginState, mail: e.valueOf() })
            }
          />

          <TextInput
            mode="outlined"
            label="Contraseña"
            placeholder="*********"
            value={loginState.pass}
            secureTextEntry={true}
            onChangeText={(e) =>
              setLoginState({ ...loginState, pass: e.valueOf() })
            }
          />

          <PaperButton
            style={{ marginTop: 8, marginBottom: 8 }}
            mode="contained"
            disabled={!(loginState.mail != "" && loginState.pass != "")}
            onPress={() => attemptLogin()}
          >
            Ingresar
          </PaperButton>

          {loginState.isError && (
            <Text>Ha ocurrido un error. Por favor vuelva a intentarlo</Text>
          )}
        </View>
      )}

      {isRegister && (
        <RegisterUser
          onSuccess={async () => {
            let token = await AsyncStorage.getItem("@token");
            let uuid = await AsyncStorage.getItem("@uuid");
            if (token && uuid) await fetchInfoUsuario(uuid, token);
            setIsRegister(false);
            allProps.CheckLogged();
          }}
          onFailure={() => {}}
        />
      )}
      {allProps.extraProps && (
        <>
          <UserInfo isLoggedIn={loginState.isLoggedIn} />
          <Button
            title="Cambiar contraseña"
            onPress={() => nav.navigate("CambiarContraseña")}
          />
          <View style={{ margin: 8 }} />
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

          <Button
            title="Mis Reclamos"
            onPress={() => nav.navigate("MisReclamos")}
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
