import { View, Text, SafeAreaView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { AppBar } from '@react-native-material/core'
import {useNavigation } from "@react-navigation/native"
import SearchBar from '../components/SearchBar'





const HomeScreen = () => {
  // Hook para quitar el auto-header de navi
  const navi = useNavigation();


useLayoutEffect(() => navi.setOptions( {
  // headerTitle: "a"
  headerShown: false
}), [] )


  return (
    // SafeAreaView creo que deberia permitir que los cell digan que tanto bajar la header por ejemplo (no creo que ufnque en el que tengo yo)
    <SafeAreaView>
      <AppBar title="Home" />
      <SearchBar/>
    </SafeAreaView>
  )
}

export default HomeScreen