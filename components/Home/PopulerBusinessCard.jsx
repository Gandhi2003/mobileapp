import { View, Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function PopulerBusinessCard({ business }) {
  const router = useRouter();
  return (
    <TouchableOpacity
    onPress={()=>router.push("/businessdetail/" + business.id)}
      style={{
        marginLeft: 20,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 15,
      }}
    >
      <Image
        source={{ uri: business.imageUrl }}
        style={{
          width: 200,
          height: 130,
          borderRadius: 15,
        }}
      />
      <View style={{ marginTop: 7, gap: 5 }}>
        <Text
          style={{
            fontSize: 17,
            fontFamily:"outfit-bold"
          }}
        >
          {business.name}
        </Text>
        <Text
          style={{
            fontSize: 13,
            fontFamily:"outfit-medium"
          }}
        >
          {business.address}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
            <Image
              source={require("../../assets/images/stars.png")}
              style={{
                width: 15,
                height: 15,
              }}
            />
            <Text style={{ fontFamily:"outfit-regular"}}>4.5</Text>
          </View>
          <Text
            style={{
              backgroundColor: Colors.PRIMARY,
              color: "#fff",
              padding: 3,
              fontSize: 10,
              borderRadius: 5,
               fontFamily:"outfit-regular"
            }}
          >
            {business.category}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
