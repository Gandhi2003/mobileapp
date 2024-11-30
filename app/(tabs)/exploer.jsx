import { View, Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import Category from "../../components/Home/Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import ExploreBusinesslist from "../../components/Explore/ExploreBusinesslist";
import { useNavigation } from "expo-router";

export default function exploer() {
  const [businesslist, setBusinessList] = useState([]);

  const navigation=useNavigation();
  useEffect(()=>{
    navigation.setOptions({
      headerShown:true,
      headerTitle:"Explore More",
      headerStyle:{
        backgroundColor:Colors.PRIMARY
      }
    })
  },[])

  const GetBusinesByCategory = async (category) => {
    setBusinessList([]);
    const q = query(collection(db, "BusinessList"),where("category", "==", category));
    const Querys = await getDocs(q);
    Querys.forEach((doc) => {
      setBusinessList((prev) => [...prev, { id: doc?.id, ...doc.data() }]);
    });
  };
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 30 ,fontFamily:"outfit-bold"}}>Explore More</Text>
      {/* SearchBar */}

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          backgroundColor: "white",
          padding: 10,
          marginVertical: 10,
          marginTop: 15,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: Colors.PRIMARY,
        }}
      >
        <Ionicons name="search" size={24} color={Colors.PRIMARY} />
        <TextInput placeholder="Search..." style={{ fontSize: 16 ,}} />
      </View>
      {/* Category */}

      <Category
        exploer={true}
        onCagetorySelect={(category) => GetBusinesByCategory(category)}
      />

      {/* Business List */}

      <ExploreBusinesslist businessList={businesslist} />
    </View>
  );
}
