import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Share,
} from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function MenuList() {
  const { signOut } = useAuth();
  const menuList = [
    {
      id: 1,
      name: "Add Business",
      icon: require("../../assets/images/add.png"),
      path: "/business/add-business",
    },
    {
      id: 2,
      name: "My Business",
      icon: require("../../assets/images/mybusi.png"),
      path: "/business/my-business",
    },
    {
      id: 3,
      name: "Share App",
      icon: require("../../assets/images/next.png"),
      path: "Share",
    },
    {
      id: 4,
      name: "Logout",
      icon: require("../../assets/images/logout.png"),
      path: "Logout",
    },
  ];
  const router = useRouter();
  const onMenuClick = (item) => {
    if (item.path == "Logout") {
      signOut();
      return;
    }
    if (item.path == "Share") {
      Share.share({
        message:
          "Download he Business Directory App By Gandhiraj , Download URL:",
      });
      return;
    }
    router.push(item.path);
  };

  return (
    <View
      style={{
        marginTop: 50,
      }}
    >
      <FlatList
        data={menuList}
        numColumns={2}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => onMenuClick(item)}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                flex: 1,
                padding: 10,
                borderRadius: 15,
                borderWidth: 1,
                margin: 10,
                backgroundColor: "#fff",
                borderColor: Colors.PRIMARY,
              }}
            >
              <Image
                source={item.icon}
                style={{
                  width: 50,
                  height: 50,
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  flex: 1,
                  fontFamily: "outfit-medium",
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      <Text
        style={{
          textAlign:"center",
          marginTop: 50,
          color: "gray",
          fontFamily: "outfit-regular",
        }}
      >
        Developed By Gandhiraj @ 2024
      </Text>
    </View>
  );
}
