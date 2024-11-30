import { View, Text, Image } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";

export default function Userinfo() {
  const { user } = useUser();
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
      }}
    >
      <Image
        source={{ uri: user?.imageUrl }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 99,
        }}
      />
      <Text
        style={{
          fontSize: 20,
          fontFamily:"outfit-medium"
        }}
      >
        {user?.fullName}
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontFamily:"outfit-regular"
        }}
      >
        {user?.primaryEmailAddress?.emailAddress}
      </Text>
    </View>
  );
}
