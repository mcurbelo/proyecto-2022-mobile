import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Button, View, Text, Alert } from "react-native";
import { ActivityIndicator, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { updateContrasena } from "../tmp/UserService";
import { RootStackScreenProps } from "../types";

type ChangePasswordProps = {};
type ChangePasswordState = {
  currentPassword: string;
  newPassword: string;
  repeatPassword: string;
  isLoading: boolean;
};
const CambiarContraseña = ({
  navigation,
  route,
}: RootStackScreenProps<"CambiarContraseña">) => {
  const [state, setState] = useState({} as ChangePasswordState);
  const canSubmit = () => {
    return (
      state.currentPassword &&
      state.newPassword &&
      state.repeatPassword &&
      state.newPassword == state.repeatPassword
    );
  };

  const passwordsDontMatch = () => {
    return (
      state.newPassword != "" &&
      state.repeatPassword != "" &&
      state.newPassword == state.repeatPassword
    );
  };

  const submitChangePassword = async () => {
    let token = await AsyncStorage.getItem("@token");
    let uuid = await AsyncStorage.getItem("@uuid");
    if (!token || !uuid) return;
    setState({ ...state, isLoading: true });
    updateContrasena(token, uuid, {
      contrasenaVieja: state.currentPassword,
      contrasenaNueva: state.newPassword,
    }).then((response) => {
      setState({ ...state, isLoading: false });
      if (response.success) {
        Alert.alert("Exito!", "Su contraseña ha sido cambiada correctamente!");
        navigation.pop();
      } else {
        Alert.alert("Error!", response.message);
      }
    });
  };
  return (
    <SafeAreaView style={{ padding: 8, flexDirection: "column" }}>
      {state.isLoading && <ActivityIndicator size={"large"} />}
      <TextInput
        disabled={state.isLoading}
        mode="outlined"
        label="Contraseña"
        placeholder="*********"
        value={state.currentPassword}
        secureTextEntry={true}
        onChangeText={(e) =>
          setState({ ...state, currentPassword: e.valueOf() })
        }
      />
      <TextInput
        disabled={state.isLoading}
        mode="outlined"
        label="Nueva Contraseña"
        placeholder="*********"
        value={state.newPassword}
        secureTextEntry={true}
        onChangeText={(e) => setState({ ...state, newPassword: e.valueOf() })}
      />
      <TextInput
        disabled={state.isLoading}
        mode="outlined"
        label="Repetir Nueva Contraseña"
        placeholder="*********"
        value={state.repeatPassword}
        secureTextEntry={true}
        onChangeText={(e) =>
          setState({ ...state, repeatPassword: e.valueOf() })
        }
      />
      <View style={{ margin: 8 }} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 8,
        }}
      >
        {!passwordsDontMatch() && <Text>Las contraseñas no coinciden</Text>}
      </View>
      <Button
        title="Cambiar contraseña"
        disabled={!canSubmit() || state.isLoading}
        onPress={() => submitChangePassword()}
      />
    </SafeAreaView>
  );
};

export default CambiarContraseña;
