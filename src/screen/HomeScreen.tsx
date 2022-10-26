import {
  View,
  Text,
  SafeAreaView,
  ProgressBarAndroidBase,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "../components/SearchBar";
import BarraSuperior from "../components/BarraSuperior";

type Error = {
  error: boolean;
  message: string;
}

const HomeScreen = () => {
  const [search, setSearch] = useState("");
  const [pressed, wasPressed] = useState(false);

  const [isBlurred, setBlur] = useState();

  return (
    <SafeAreaView>
      <BarraSuperior
        nombre="Home"
        wasPressed={wasPressed}
        pressed={pressed}
        tieneSearchBar={true}
      />

      <ScrollView style={styles.root}>
        {pressed && (
          <SearchBar
            text={search}
            setText={setSearch} /*isBlurred={isBlurred} setBlur={setBlur}*/
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  root: {
    padding: 20,
  },
});

export default HomeScreen;
