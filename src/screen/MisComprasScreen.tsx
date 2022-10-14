import { SafeAreaView, Text } from 'react-native'
import React, {useLayoutEffect} from 'react'

import {useNavigation} from '@react-navigation/native'
import { Stack, Button } from "@react-native-material/core";
import { MaterialBottomTabNavigationProp, MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import { TabNavigatorParamList } from '../navigator/Navigator';

import Registrar from './RegistrarScreen';


type MisComprasProps = MaterialBottomTabScreenProps<TabNavigatorParamList, "MisComprasScreen">
const MisComprasScreen = ({route, navigation}: MisComprasProps) => {

  return (

    <Stack fill center spacing={4}>     
      <Button title="REGISTRE-SE"
      // TODO: Esto es un parche haceme acordar que te pregunte porque esto no sería un tab
      onPress={() => navigation.navigate(Registrar)}

       />

      {/* <Text>MisCompras</Text> */}
      </Stack>
      )
}

export default MisComprasScreen