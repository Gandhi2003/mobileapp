import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { collection, getDocs, query } from "firebase/firestore";
import PopulerBusinessCard from "./PopulerBusinessCard";
import { db } from "../../configs/FirebaseConfig";

export default function PopulerBusinesslist() {
  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    GetBusinessList();
  }, []);

  const GetBusinessList = async () => {
    setBusinessList([]);
    const q = query(collection(db, "BusinessList"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setBusinessList((prev) => [...prev, { id: doc?.id, ...doc.data() }]);
    });
  };

  return (
    <View>
      <View
        style={{
          paddingLeft: 20,
          marginBottom: 10,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          marginTop: 20,
        }}
      >
        <Text
          style={{
            marginTop: 10,
            fontSize: 20,
            fontFamily:"outfit-bold"
          }}
        >
          Populer BusinessList
        </Text>
        <Text style={{ color: Colors.PRIMARY ,fontFamily:"outfit-regular" }}>View All</Text>
      </View>
      <FlatList
        data={businessList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <PopulerBusinessCard business={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
