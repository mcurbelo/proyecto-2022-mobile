import { useEffect, useState } from "react";
import { RootTabScreenProps } from "../types";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({
  route,
  navigation,
}: RootTabScreenProps<"HomeScreen">) => {
  const [logged, setLogged] = useState({ uuid: "", token: "" });

  const logout = () => {
    AsyncStorage.removeItem("@uuid");
    AsyncStorage.removeItem("@token");
    setLogged({ ...logged, uuid: "", token: "" });
    navigation.navigate("Root");
  };

  useEffect(() => {
    AsyncStorage.getItem("@uuid").then((v) => {
      if (v != null && v != logged.uuid) setLogged({ ...logged, uuid: v })
    })
    AsyncStorage.getItem("@token").then((v) => {
      if (v != null && v != logged.token) setLogged({ ...logged, token: v })
    })
  }, [logged])


  return (
    <View>
      {logged.token != "" && <Button onPress={() => logout()}>OUT</Button>}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
