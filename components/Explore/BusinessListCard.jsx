import { View, Text, Image } from "react-native";
import React from "react";

export default function BusinessListCard({ business }) {
  return (
    <View style={{
        backgroundColor:"#fff",
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15,
        marginTop:15,
    }}>
      <Image
        source={{ uri: business.imageUrl }}
        style={{
          width: "100%",
          height: 150,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
      />
      <View
        style={{
          padding: 10,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            fontFamily:"outfit-bold"
          }}
        >
          {business.name}
        </Text>
        <Text
          style={{
            color: "gray",
            fontFamily:"outfit-medium"
          }}
        >
          {business.address}
        </Text>
      </View>
    </View>
  );
}
