import { View, Text, StyleSheet } from "react-native";
import React, { FC, useState } from "react";
// import { AppBar, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { Appbar } from "react-native-paper";
import SearchBar from "./SearchBar";

interface Props {
  nombre: string;
  tieneSearchBar?: boolean | undefined
  pressed: boolean
  wasPressed: (was:boolean)=>void
}

const BarraSuperior: FC<Props> = (props) => {
  const [search, setSearch] = useState("");

  return (
    <Appbar.Header>
      {/* ack */}
      <Appbar.BackAction onPress={() => {}} />
      <Appbar.Content title={props.nombre}/>
      {/*TODO: Aca la idea es que aparesca la barrita porque no funciona? */}
      {/* Le puse el () para que se deje de joder */}

      {props.tieneSearchBar &&<Appbar.Action icon="magnify" onPress={()=>{props.wasPressed(!props.pressed)
      props.pressed= !props.pressed}} />}
    </Appbar.Header>
    // <View>
    //   <AppBar
    //     style={styles.app}
    //     title={props.nombre}
    //     // TODO: O tengo el titul en el medio o tengo el icono en la derecha... PORQUE????

    //     centerTitle={true}
    //     color="#ffffa7"
    //     trailing={(props) => (
    //       <IconButton
    //         icon={(props) => (
    //           <Icon name="account-circle" {...props} size={40} />
    //         )}
    //         {...props}
    //       />
    //     )}
    //   />
    // </View>
  );
};
const styles = StyleSheet.create({
  app: {
    // dont work
    // fontSize: 40,
  },
});
export default BarraSuperior;
