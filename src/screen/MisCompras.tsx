import { SafeAreaView, Text } from 'react-native'
import React, {useLayoutEffect} from 'react'

import {useNavigation} from '@react-navigation/native'
import { Stack, Button } from "@react-native-material/core";
 import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const MisCompras = ({navigation}) => {


  return (

    <Stack fill center spacing={4}>     
      <Button title="REGISTRE-SE"
      onPress={() => navigation.navigate('registrarse')}

       />

      {/* <Text>MisCompras</Text> */}
      </Stack>
      )
}

export default MisCompras