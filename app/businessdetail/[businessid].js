import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { db } from "../../configs/FirebaseConfig"
import { doc, getDoc } from 'firebase/firestore'
import { Colors } from '../../constants/Colors'
import Intro from '../../components/BusinessDetail/Intro';
import ActionButton from '../../components/BusinessDetail/ActionButton'
import About from '../../components/BusinessDetail/About'
import Reviews from '../../components/BusinessDetail/Reviews'
import { SafeAreaView } from 'react-native';

export default function BusinessDetail() {
  const { businessid } = useLocalSearchParams()
  const [business, setBusiness] = useState([]) // Initialize as null or an empty object
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBusinessDetailById();
  }, [])

  const getBusinessDetailById = async () => {
    setBusiness([])
    setLoading(true) // Start loading
    const docRef = doc(db, "BusinessList", businessid)
    const docSnap = await getDoc(docRef) // Use getDoc for a single document

    if (docSnap.exists()) {
      setBusiness({ id: docSnap.id, ...docSnap.data() })
    } else {
      console.log("No document data")
    }

    setLoading(false) // Stop loading
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {loading ?
          <ActivityIndicator
            style={{
              marginTop: "70%"
            }}
            size={"large"}
            color={Colors.PRIMARY}
          />
          :
          <ScrollView>
            {/* Intro */}
            <Intro business={business} />

            {/* Action Button */}
            <ActionButton business={business} />

            {/* About Button */}
            <About business={business} />
            {/* Select your favorite Reviews */}
            <Reviews business={business} />
          </ScrollView>
        }
      </View>
    </SafeAreaView>
  )
}
