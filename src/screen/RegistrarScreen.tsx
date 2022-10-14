import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import React from "react";
import SingleInput from "../components/SingleInput";

const RegistrarScreen = () => {
  const { height, width } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.root}>
      <Text>Registrar</Text>
      {/* TODO: RNFE */}
      <SingleInput
        placeholder="EMAIL"
        // TODO: Too much?
        // autoComplete="emailAdress"
        // kbType="email-address"
        // textCType="emailAddress"
        label="Ingrese su email: "
      />
      <SingleInput placeholder="NOMBRE" label="Ingrese su nombre:" />
      <SingleInput placeholder="Apellido" label="Ingrese su apellido:" />
      <SingleInput
        placeholder="DD/MM/YYYY"
        label="Ingrese su fecha de nacimiento(OPCIONAL)"
        autoComplete="birthdate-full"
      />

    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 60,
  },
});

export default RegistrarScreen;
