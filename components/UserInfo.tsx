import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { Avatar, TextInput } from "react-native-paper";
import { updateUser } from "../tmp/UserService";
type UserInfo = {
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  imagein: string;
  calificacion: number;
  isEdit: boolean;
};
type UserInfoProps = {
  onEditCompleted?: () => void;
  isLoggedIn: boolean;
};

const UserInfo = (props: UserInfoProps) => {
  const [state, setState] = useState({ isEdit: false } as UserInfo);
  const init = async () => {
    let userInfo = await AsyncStorage.getItem("@userInfo");
    let userId = await AsyncStorage.getItem("@uuid");
    if (!userId || !userInfo) return;
    debugger;
    let userInfoObject = JSON.parse(userInfo);
    setState({ ...state, id: userId, ...userInfoObject, isEdit: false });
  };
  React.useEffect(() => {
    init();
    return function cleanup() {
      setState({ ...state, isEdit: false });
    };
  }, [props]);

  const actualizarUsuario = async () => {
    let userId = await AsyncStorage.getItem("@uuid");
    let token = await AsyncStorage.getItem("@token");
    if (!userId || !token) return;

    updateUser(
      {
        uuid: userId,
        nombre: state.nombre,
        apellido: state.apellido,
        telefono: state.telefono,
        correo: state.correo,
      },
      token
    )
      .then(async (response) => {
        if (response.success) {
          let userInfo = await AsyncStorage.getItem("@userInfo");
          if (!userInfo) return; // Should refetch user info from backend
          let objectInfo = JSON.parse(userInfo);
          objectInfo.correo = state.correo;
          objectInfo.nombre = state.nombre;
          objectInfo.apellido = state.apellido;
          objectInfo.telefono = state.apellido;
          await AsyncStorage.removeItem("@userInfo");
          await AsyncStorage.setItem("@userInfo", JSON.stringify(objectInfo));
          setState({ ...state, isEdit: false });
        }
      })
      .catch((error) => {
        debugger;
      });
  };

  return (
    <View style={{ flexDirection: "column", width: "100%" }}>
      {!state.isEdit && (
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Avatar.Image
              source={{
                uri:
                  state.imagein && state.imagein != ""
                    ? state.imagein
                    : "https://www.pngkey.com/png/detail/114-1149847_avatar-unknown-dp.png",
              }}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "500",
                alignSelf: "center",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              {state.correo}
            </Text>
            <FontAwesome
              name="pencil"
              size={20}
              onPress={() => setState({ ...state, isEdit: true })}
            />
          </View>
          <Text style={{ fontSize: 18, marginBottom: 8 }}>
            {state.nombre} {state.apellido}
          </Text>
          <Text style={{ fontSize: 15, marginBottom: 8 }}>
            Telefono: {state.telefono}
          </Text>
        </View>
      )}
      {state.isEdit && (
        <View style={{ marginBottom: 20 }}>
          <TextInput
            onChangeText={(e) => setState({ ...state, correo: e.valueOf() })}
            label={"Correo"}
            placeholder={state.correo}
            style={{ marginBottom: 8 }}
            value={state.correo}
            mode="outlined"
          />
          <TextInput
            onChangeText={(e) => setState({ ...state, nombre: e.valueOf() })}
            label={"Nombre"}
            placeholder={state.nombre}
            style={{ marginBottom: 8 }}
            value={state.nombre}
            mode="outlined"
          />
          <TextInput
            onChangeText={(e) => setState({ ...state, apellido: e.valueOf() })}
            label={"Apellido"}
            placeholder={state.apellido}
            style={{ marginBottom: 8 }}
            value={state.apellido}
            mode="outlined"
          />
          <TextInput
            onChangeText={(e) => setState({ ...state, telefono: e.valueOf() })}
            label={"Telefono"}
            keyboardType={"number-pad"}
            placeholder={state.telefono}
            style={{ marginBottom: 8 }}
            value={state.telefono}
            mode="outlined"
          />
          <Button title="Modificar" onPress={() => actualizarUsuario()} />
          <View style={{ height: 8 }} />

          <Button title="cancelar" color={"red"} onPress={() => init()} />
        </View>
      )}
    </View>
  );
};

export default UserInfo;
