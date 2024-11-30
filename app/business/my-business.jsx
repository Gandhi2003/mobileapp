import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import BusinessListCard from "../../components/Explore/BusinessListCard";
import {Colors} from "../../constants/Colors"
import { useNavigation } from "expo-router";

export default function MyBusiness() {
  const { user } = useUser();
  const [businessList, setBusinessList] = useState([]);
  const [loading,setLoading]=useState(false)
 
   const navigation=useNavigation()

  useEffect(() => {
    navigation.setOptions({
      headerShown:true,
      headerTitle:"My Business",
      headerStyle:{
        backgroundColor:Colors.PRIMARY
      }
    })
    user && GetUserBusiness();
  }, [user]);

  const GetUserBusiness = async () => {
    setLoading(true)
    setBusinessList([]);
    const q = query(
      collection(db, "BusinessList"),
      where("userEmail", "==", user.primaryEmailAddress.emailAddress)
    );
    const Querys = await getDocs(q);
    Querys.forEach((doc) => {
      setBusinessList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
      console.log(doc.data());
    });
    setLoading(false)
  };

  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontFamily: "outfit-bold",
        }}
      >
        My Business
      </Text>
      <FlatList
        data={businessList}
        onRefresh={GetUserBusiness}
        refreshing={loading}
        keyExtractor={(item) => item.id} // Ensure unique key
        renderItem={({ item }) => (
          <BusinessListCard business={item} />
        )}
      />
    </View>
  );
}
