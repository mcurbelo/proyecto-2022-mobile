import { View, Text } from 'react-native'
import React from 'react'
import { Button } from '@react-native-material/core'

const HomeScreen = () => {
  return (
    <View>
      <Text>aaa
        <Button title ="clickMe" onPress={() => alert("asdasd")}/>
      </Text>
    </View>
  )
}

export default HomeScreen