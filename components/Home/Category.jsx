import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import CategoryItem from "./CategoryItem";
import { useRouter } from "expo-router";

export default function Category({ exploer = false, onCagetorySelect }) {
  const [categoryList, setCategoryList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    GetCategoryList();
  }, []);

  const GetCategoryList = async () => {
    setCategoryList([]);
    const q = query(collection(db, "Category"));
    const querySnapshot = await getDocs(q);
    const categories = querySnapshot.docs.map((doc) => doc.data());
    setCategoryList(categories);
  };
  const onCategoryPressHandler = (item) => {
    if (!exploer) {
      router.push("businesslist/" + item.name);
    } else {
      onCagetorySelect(item.name);
    }
  };

  return (
    <View>
      {!exploer && (
        <View
          style={{
            padding: 20,
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            marginTop: 10,
          }}
        >
          <Text
            style={{
              marginTop: 10,
              fontSize: 20,
              fontFamily:"outfit-bold"
            }}
          >
            Category
          </Text>
          <Text style={{ color: Colors.PRIMARY  ,fontFamily:"outfit-regular"}}>View All</Text>
        </View>
      )}
      <FlatList
        data={categoryList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ marginLeft: 20 }}
        renderItem={({ item, index }) => (
          <CategoryItem
            categorys={item}
            key={index}
            onCategoryPress={() => onCategoryPressHandler(item)}
          />
        )}
      
      />
    </View>
  );
}
