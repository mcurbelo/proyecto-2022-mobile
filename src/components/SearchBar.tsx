import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import React, { useLayoutEffect, FC } from "react";

import { useNavigation } from "@react-navigation/native";
import { TextInput, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

interface Props {
  text: string;
  setText: (text: string) => void;
}

import { Searchbar } from "react-native-paper";

const SearchBar: FC<Props> = (props) => {
  const navi = useNavigation();

  return (
    <View>
      <Searchbar onChangeText={props.setText} value={props.text} />

      {/* <TextInput
        placeholder="Buscar"
        trailing={(props) => (
          <IconButton
            icon={(props) => <Icon name="magnify" {...props} />}
            {...props}
          />
        )}
      /> */}
    </View>
  );
};

export default SearchBar;
