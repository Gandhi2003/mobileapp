import { View, Text } from 'react-native'
import React from 'react'

export default function About({business}) {
  return (
    <View style={{
        padding:20,
        backgroundColor:"#fff",
    }}>
      <Text
      
      style={{
        fontSize:20,
        fontFamily:"outfit-bold"
      }}
      >About</Text>
      <Text style={{
        lineHeight:25,
        fontFamily:"outfit-medium"
      }}>{business.about}</Text>
    </View>
  )
}