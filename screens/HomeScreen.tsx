import { FC } from "react";
import { RootTabParamList, RootTabScreenProps } from "../types";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationHelpersContext } from "@react-navigation/native";

// interface Props {
//   navigation: RootTabScreenProps<"HomeScreen">;
//   isLogged: boolean;
//   setLogged: () => boolean;
// }

const HomeScreen = ({
  route,
  navigation,
}: RootTabScreenProps<"HomeScreen">) => {
  const logout = () => {
    AsyncStorage.removeItem("@uuid");
    navigation.navigate("Root");
  };
  const isLogged = async () => {
    return AsyncStorage.getItem("@uuid")
      .then(() => true)
      .catch((e) => false);
  };
  let uuid = "";

  AsyncStorage.getItem("@uuid").then((v) => {
    if (v != null) uuid = v;
console.log(`UUID ${uuid}`);

  });

  return (
    <View>{uuid != "" && <Button onPress={() => logout()}>OUT</Button>}</View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
