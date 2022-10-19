import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Component, useLayoutEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import HomeScreen from "../screen/HomeScreen";
import IniciarSesionScreen from "../screen/IniciarSesionScreen";
import MisComprasScreen from "../screen/MisComprasScreen";
import RegistrarScreen from "../screen/RegistrarScreen";

const Stack = createNativeStackNavigator();

export type TabNavigatorParamList = {
  HomeScreen: undefined;
  MisComprasScreen: undefined;
  RegistrarScreen: undefined;
  IniciarSesionScreen: undefined;
};

const Tab = createMaterialBottomTabNavigator<TabNavigatorParamList>();

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="RegistrarScreen" component={RegistrarScreen} />

      {/* TODO: quito por ahora */}
      {/* <Tab.Screen name="MisComprasScreen" component={MisComprasScreen} /> */}
      <Tab.Screen name="IniciarSesionScreen" component={IniciarSesionScreen} />
    </Tab.Navigator>
  );
}


export class Navigator extends Component {
  render() {
    return (
      // TODO: pense que styles genericos podria pegarlos
      // <SafeAreaView style={styles.root}>

      <NavigationContainer >
        <Stack.Navigator > 
            <Stack.Screen
              name="HomeTabs"
              component={HomeTabs}
              options={{ headerShown: false }}

            />
            <Stack.Screen name="RegistrarScreen" component={RegistrarScreen} />
            <Stack.Screen
              name="IniciarSesion"
              component={IniciarSesionScreen}
            />
         </Stack.Navigator>
      </NavigationContainer>
      // </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  root: {
    // backgroundColor: "grey",
  },
});

export default Navigator;
