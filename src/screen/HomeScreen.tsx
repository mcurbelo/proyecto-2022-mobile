import { View, Text, SafeAreaView, ProgressBarAndroidBase } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "../components/SearchBar";
import BarraSuperior from "../components/BarraSuperior";

const HomeScreen = () => {
  const [search, setSearch] = useState("");
  const [pressed ,wasPressed] = useState(false);



  return (
    <SafeAreaView>
      <BarraSuperior nombre="Home" wasPressed={wasPressed} pressed={pressed}/>

     {pressed && <SearchBar text={search} setText={setSearch} />}
    </SafeAreaView>
  );
};

export default HomeScreen;
