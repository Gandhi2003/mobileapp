import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

export default function CategoryItem({ categorys,onCategoryPress }) {
  return (
    <TouchableOpacity onPress={()=>onCategoryPress(categorys)}>
      <View
        style={{
          padding: 20,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 99,
          marginRight: 15,
        }}
      >
        <Image
          source={{ uri: categorys.icon }}
          style={{ width: 40, height: 40 }}
        />
      </View>
      <Text
        style={{
          fontSize: 12,
          textAlign: "center",
          marginTop: 5,
          fontFamily:"outfit-regular"
        }}
      >
        {categorys.name}
      </Text>
    </TouchableOpacity>
  );
}
