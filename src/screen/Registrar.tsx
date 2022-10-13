import { SafeAreaView, View, Text } from 'react-native'
import React from 'react'
import { TextInput } from '@react-native-material/core'

const Registrar = () => {
  return (
    <SafeAreaView>
      <Text>Registrar</Text>

      <TextInput variant="outlined" label="Label" style={{ margin: 16 }} />
    </SafeAreaView>
  )
}

export default Registrar