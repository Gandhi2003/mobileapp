import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function BusinessListCard({ business }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        margin: 10,
        borderRadius: 15,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "row",
        gap: 10,
      }}
      onPress={() => router.push("/businessdetail/" + business.id)}
    >
      <Image
        source={{ uri: business.imageUrl }}
        style={{ width: 120, height: 120, borderRadius: 15 }}
      />

      <View
        style={{
          flex: 1,
          gap: 7,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily:"outfit-bold"
          }}
        >
          {business.name}
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily:"outfit-medium"
          }}
        >
          {business.address}
        </Text>
        <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
          <Image
            source={require("../../assets/images/stars.png")}
            style={{
              width: 15,
              height: 15,
            }}
          />
          <Text style={{ fontSize: 15 ,fontFamily:"outfit-regular"}}>4.5</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
