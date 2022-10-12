import { SafeAreaView, Text } from 'react-native'
import React, {useLayoutEffect} from 'react'

import {useNavigation} from '@react-navigation/native'

const MisCompras = () => {

  const navi = useNavigation();
  useLayoutEffect(()=> navi.setOptions({headerShown:false}))
  return (
    <SafeAreaView>
      <Text>MisCompras</Text>
    </SafeAreaView>
  )
}

export default MisCompras