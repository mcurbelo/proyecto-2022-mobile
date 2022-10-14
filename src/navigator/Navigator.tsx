import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Component } from 'react'
import HomeScreen from '../screen/HomeScreen';
import MisCompras from '../screen/MisComprasScreen';
import Registrar from '../screen/RegistrarScreen';

const Stack = createNativeStackNavigator();

export type TabNavigatorParamList = {
  Home: undefined;
  MisCompras: undefined;
};

const Tab = createMaterialBottomTabNavigator<TabNavigatorParamList>();

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="MisCompras" component={MisCompras} />
    </Tab.Navigator>
  );
}

export class Navigator extends Component {
  render() {
    return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeTabs" component={HomeTabs} />

        <Stack.Screen name="Registrar" component={Registrar} />
      </Stack.Navigator>
    </NavigationContainer>
    )
  }
}

export default Navigator