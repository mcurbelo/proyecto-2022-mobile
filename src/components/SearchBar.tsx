import { SafeAreaView, Text, StyleSheet } from "react-native";
import React, { useLayoutEffect } from "react";

import { useNavigation } from "@react-navigation/native";
import { TextInput, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const SearchBar = () => {
  const navi = useNavigation();
  useLayoutEffect(() => navi.setOptions({ headerShown: false }));

  return (
    <SafeAreaView>
      <TextInput
        placeholder="Buscar"
        trailing={(props) => (
          <IconButton
            icon={(props) => <Icon name="magnify" {...props} />}
            {...props}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default SearchBar;
