import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";
import React, { useLayoutEffect, FC } from "react";

import { useNavigation } from "@react-navigation/native";
import { TextInput, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

interface Props {
  text: string;
  setText: (text: string) => void;

  // TODO: Me enganche innecesariemente con el quitar el searchbar luego de descliquearla..
  // setBlur: (e:NativeSyntheticEvent<TextInputFocusEventData>) => void
  // isBlurred: Boolean;
  // setBlur?: (is: boolean) =>void
}

import { Searchbar } from "react-native-paper";
import { setStatusBarBackgroundColor } from "expo-status-bar";

const SearchBar: FC<Props> = (props) => {
  return (
    <View>
      <Searchbar
        onChangeText={props.setText}
        value={props.text} /* onBlur={props.setBlur} */
      />

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
