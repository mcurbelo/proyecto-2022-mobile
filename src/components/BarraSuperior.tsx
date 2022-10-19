import { View, Text, StyleSheet } from "react-native";
import React, { FC } from "react";
import { AppBar, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

interface Props {
  nombre: string;
}

const BarraSuperior: FC<Props> = (props) => {
  return (
    <View>
      <AppBar
        style={styles.app}
        title={props.nombre}
        // TODO: O tengo el titul en el medio o tengo el icono en la derecha... PORQUE????

        centerTitle={true}
        color="#ffffa7"
        trailing={(props) => (
          <IconButton
            icon={(props) => (
              <Icon name="account-circle" {...props} size={40} />
            )}
            {...props}
          />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  app: {
    // dont work
    // fontSize: 40,
  },
});
export default BarraSuperior;
