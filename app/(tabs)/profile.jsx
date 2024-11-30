import { View, Text } from "react-native";
import React from "react";
import Userinfo from "../../components/Profile/Userinfo";
import MenuList from "../../components/Profile/MenuList";

export default function profile() {
  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 35,
          fontFamily:"outfit-bold"
        }}
      >
        profile
      </Text>

      {/* User info */}
      <Userinfo />

      {/* menu List */}
      <MenuList />
    </View>
  );
}
