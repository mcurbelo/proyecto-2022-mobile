import React, {useLayoutEffect} from 'react'

import { Stack, Button } from "@react-native-material/core";
import { MaterialBottomTabNavigationProp, MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import { TabNavigatorParamList } from '../navigator/Navigator';



type MisComprasProps = MaterialBottomTabScreenProps<TabNavigatorParamList, "MisComprasScreen">
const MisComprasScreen = ({route, navigation}: MisComprasProps) => {

  return (

    <Stack fill center spacing={4}>     
      <Button title="REGISTRE-SE"
      // TODO: Esto es un parche haceme acordar que te pregunte porque esto no sería un tab
      onPress={() => navigation.navigate('RegistrarScreen')}

       />

      {/* <Text>MisCompras</Text> */}
      </Stack>
      )
}

export default MisComprasScreen