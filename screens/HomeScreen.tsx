import { FC, useEffect, useState } from "react";
import { RootTabParamList, RootTabScreenProps } from "../types";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions, NavigationHelpersContext } from "@react-navigation/native";

// interface Props {
//   navigation: RootTabScreenProps<"HomeScreen">;
//   isLogged: boolean;
//   setLogged: () => boolean;
// }

const HomeScreen = ({
  route,
  navigation,
}: RootTabScreenProps<"HomeScreen">) => {
  const [logged, setLogged] = useState({ uuid: "", token: "" });

  const logout = () => {
    AsyncStorage.removeItem("@uuid");
    AsyncStorage.removeItem("@token");
    setLogged({ ...logged, uuid: "", token: "" });

    // const resetNavigation = CommonActions.reset({
    //   index:0,
    //   routes: [{name:"Root"}]
    // })

    navigation.navigate("Root");
  };
  useEffect(() => {
    AsyncStorage.getItem("@uuid").then((v)=>{if(v!=null) setLogged({...logged, uuid: v})})
    AsyncStorage.getItem("@token").then((v)=>{if(v!=null) setLogged({...logged, token: v})})

    
  },[])


  return (
    <View>
      {logged.token != "" && <Button onPress={() => logout()}>OUT</Button>}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
