import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  Share,
} from "react-native";
import React from "react";

export default function ActionButton({ business }) {
  const actionButton = [
    {
      id: 1,
      name: "Call",
      icon: require("../../assets/images/call.png"),
      url: "tel:" + business.contact,
    },
    {
      id: 2,
      name: "Location",
      icon: require("../../assets/images/circle.png"),
      url: "https://maps.google.com/?q=" + encodeURIComponent(business.address),
    },
    {
      id: 3,
      name: "Web",
      icon: require("../../assets/images/web.png"),
      url: business.website,
    },
    {
      id: 4,
      name: "Share",
      icon: require("../../assets/images/share.png"),
      // url: "share", // Placeholder; you'll need to handle this case differently
    },
  ];

  const onPressHandle = (item) => {
    if (item.name === "Share") {
      Share.share({
        message:
          business?.name +
          "\n Address: " +
          business?.address +
          "\n Find more details on Business Directory App By Gandhiraja ! ",
      });
      return;
    }
    Linking.openURL(item.url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <View
      style={{
        backgroundColor: "#fff",
        padding: 20,
      }}
    >
      <FlatList
        data={actionButton}
        numColumns={4}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item, index }) => (
          <TouchableOpacity key={index} onPress={() => onPressHandle(item)}>
            <Image
              source={item.icon}
              style={{
                width: 50,
                height: 50,
              }}
            />
            <Text style={{ textAlign: "center", marginTop: 3 ,fontFamily:"outfit-medium"}}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        // keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
