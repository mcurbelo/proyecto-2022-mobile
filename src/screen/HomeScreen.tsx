import { View, Text, SafeAreaView } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "../components/SearchBar";
import BarraSuperior from "../components/BarraSuperior";

const HomeScreen = () => {
  // Hook para quitar el auto-header de navi
  const navi = useNavigation();

  useLayoutEffect(
    () =>
      navi.setOptions({
        headerShown: false,
      }),
    []
  );

  return (
    <SafeAreaView>
      <BarraSuperior nombre="Home" /> 
     
      <SearchBar />
    </SafeAreaView>
  );
};

export default HomeScreen;
