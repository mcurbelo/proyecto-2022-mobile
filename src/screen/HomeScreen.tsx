import { View, Text, SafeAreaView } from "react-native";
import React, { useLayoutEffect } from "react";
import { AppBar, HStack, IconButton } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "../components/SearchBar";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const HomeScreen = () => {
  // Hook para quitar el auto-header de navi
  const navi = useNavigation();

  useLayoutEffect(
    () =>
      navi.setOptions({
        // headerTitle: "a"
        headerShown: false,
      }),
    []
  );

  return (
    // SafeAreaView creo que deberia permitir que los cell digan que tanto bajar la header por ejemplo (no creo que ufnque en el que tengo yo)
    <SafeAreaView>
      <AppBar
      title="Title"

        leading={(props) => (
          <IconButton
            icon={(props) => <Icon name="menu-down" {...props} />}
            {...props}
          />
        )}
      />

      <SearchBar />
    </SafeAreaView>
  );
};

export default HomeScreen;
