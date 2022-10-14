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
        headerShown: false,
      }),
    []
  );

  return (
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
