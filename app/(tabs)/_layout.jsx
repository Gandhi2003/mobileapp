import { Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
         headerShown: false ,
         tabBarActiveTintColor:Colors.PRIMARY

    }}>
      <Tabs.Screen name="home"
      
      options={{
        tabBarLabel: "Home",
        tabBarIcon: ({ color }) => <Ionicons name="home" size={24}  color={color} style={{fontFamily:"outfit-medium"}}/>,
      }}
      
      />
      <Tabs.Screen name="exploer" 
       options={{
        tabBarLabel: "exploer",
        tabBarIcon: ({ color }) => <Ionicons name="search" size={24} color={color} style={{fontFamily:"outfit-medium"}} />,
      }}
      />
      <Tabs.Screen name="profile"
       options={{
        tabBarLabel: "profile",
        tabBarIcon: ({ color }) => <Ionicons name="people-circle" size={24} color={color} style={{fontFamily:"outfit-medium"}}/>,
      }}
       />
    </Tabs>
  );
}
