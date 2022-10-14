import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Component, useLayoutEffect } from "react";
import HomeScreen from "../screen/HomeScreen";
import IniciarSesionScreen from "../screen/IniciarSesionScreen";
import MisComprasScreen from "../screen/MisComprasScreen";
import MisCompras from "../screen/MisComprasScreen";
import RegistrarScreen from "../screen/RegistrarScreen";

const Stack = createNativeStackNavigator();

export type TabNavigatorParamList = {
  HomeScreen: undefined;
  MisComprasScreen: undefined;
  Registrarse: undefined
};

const Tab = createMaterialBottomTabNavigator<TabNavigatorParamList>();

function HomeTabs() {
 
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      {/* Aca supongo que iría el "Esta logueado YYY " */}
      {true && <Tab.Screen name="MisComprasScreen" component={MisComprasScreen} />}
    </Tab.Navigator>
  );
}

export class Navigator extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomeTabs" component={HomeTabs} />
          <Stack.Screen name="Registrar" component={RegistrarScreen} />
          <Stack.Screen name="IniciarSesion" component={IniciarSesionScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Navigator;
