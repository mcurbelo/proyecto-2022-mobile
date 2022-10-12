import { View, Text } from 'react-native'
import React from 'react'

// Idea: Bottom tab con: Regular (Sarch y tal) , Compras en venta/lo que sea,


function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );;
}
function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}
export default {HomeScreen, SettingsScreen}