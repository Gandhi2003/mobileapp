import { View, Text, FlatList, ScrollView } from "react-native";
import React from "react";
import BusinessListCard from "./BusinessListCard";

export default function ExploreBusinesslist({ businessList }) {
  return (
    // <ScrollView>
      <FlatList
        data={businessList}
        scrollEnabled
        renderItem={({ item,index }) => <BusinessListCard key={index} business={item} />}
        ListFooterComponent={<View style={{ height: 200 }} />}
      />
     
    // </ScrollView>
  );
}
