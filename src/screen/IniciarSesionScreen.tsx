import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import BarraSuperior from "../components/BarraSuperior";
import { Button, Flex } from "@react-native-material/core";

const IniciarSesionScreen = () => {
  const [pass, setPass] = useState("");
  const [usuario, setUsuario] = useState("");

  const [search, setSearch] = useState("");
  const [pressed ,wasPressed] = useState(false);


  return (
    <View>
      <BarraSuperior nombre="Iniciar Sesion" wasPressed={wasPressed} pressed={pressed} tieneSearchBar={false}/>
      

      <ScrollView contentContainerStyle={styles.root}>
        {/* <SingleInput
          placeholder="Ingrese su usuario"
          value={usuario}
          setValue={setUsuario}
        />

        <SingleInput
          placeholder="Ingrese su contraseña"
          value={pass}
          setValue={setPass}
          secureTextEntry={true}
        /> */}
        <Button title="Iniciar Sesion" />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    //   display: "flex",
    //   // flexWrap:'wrap',
    //   alignContent: "center",
    //   justifyContent: "space-around",
    //   height: "40%",
    //
  },
});

export default IniciarSesionScreen;
