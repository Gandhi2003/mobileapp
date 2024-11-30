import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../../configs/FirebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";

export default function Slider() {
  const [sliderlist, setSliderlist] = useState([]);

  useEffect(() => {
    GetSliderListes();
  }, []);

  const GetSliderListes = async () => {
    setSliderlist([])
    const q = query(collection(db, "Silders"));
    const QuerSnoshot = await getDocs(q);
    QuerSnoshot.forEach((doc) => {
      setSliderlist((prev) => [...prev, doc.data()]);
    });
  };

  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          padding: 20,
          paddingTop: 20,
          paddingLeft: 20,
          marginBottom: 5,
          fontFamily:"outfit-bold"
        }}
      >
        #Special for You
      </Text>

      <FlatList
        data={sliderlist}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ paddingLeft: 20 }}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.imageUrl }}
            style={{
              width: 300,
              height: 160,
              borderRadius: 15,
              marginRight: 20,
            }}
          />
        )}
        // keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
