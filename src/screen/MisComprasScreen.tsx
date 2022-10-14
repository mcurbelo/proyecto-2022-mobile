import { SafeAreaView, Text } from 'react-native'
import React, {useLayoutEffect} from 'react'

import {useNavigation} from '@react-navigation/native'
import { Stack, Button } from "@react-native-material/core";
 import { NavigationContainer } from '@react-navigation/native';
import { MaterialBottomTabNavigationProp, MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import { TabNavigatorParamList } from '../../App';


type MisComprasProps = MaterialBottomTabScreenProps<TabNavigatorParamList, "MisCompras">
const MisCompras = ({route, navigation}: MisComprasProps) => {

  return (

    <Stack fill center spacing={4}>     
      <Button title="REGISTRE-SE"
      onPress={() => navigation.navigate('Registrar')}

       />

      {/* <Text>MisCompras</Text> */}
      </Stack>
      )
}

export default MisCompras