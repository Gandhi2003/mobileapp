import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { db } from "../../configs/FirebaseConfig"
import { collection, getDocs, query, where } from 'firebase/firestore'
import BusinessListCard from '../../components/BusinessList/BusinessListCard';
import { Colors } from '../../constants/Colors';

export default function BusinessByCategory() {

  const navigation = useNavigation();
  const { category } = useLocalSearchParams()

  const [businesslist, setBusinessList] = useState([])


  const [loading, setLoading] = useState(false)
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: category,

    })
    getBusinessList()
  }, [])
  const getBusinessList = async () => {
    setBusinessList([])
    setLoading(true)
    const q = query(collection(db, "BusinessList"), where("category", "==", category));
    const Quers = await getDocs(q)
    Quers.forEach((doc) => {
      setBusinessList((prev) => [...prev, {id:doc?.id, ...doc.data()}])
      setLoading(false)
    })
  }
  return (
    <View>
      {businesslist?.length > 0&&loading==false ? 
      <FlatList

        data={businesslist}
        onRefresh={getBusinessList}
        refreshing={loading}
        renderItem={({ item, index }) => (
          <BusinessListCard
            business={item}
            key={index}
          />

        )}

      /> : loading?<ActivityIndicator
      style={{
        marginTop:"60%"
      }}
      size={"large"}
      color={Colors.PRIMARY}
      />:

        <Text
          style={{

            fontSize: 20,
            textAlign: "center",
            marginTop: "50%",
            fontFamily:"outfit-medium"

          }}

        >No Business Found </Text>}

    </View>
  )
}