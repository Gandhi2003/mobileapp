import { View, Text, ScrollView } from "react-native";
import React from "react";
import Header from "../../components/Home/Header";
import Slider from "../../components/Home/Slider";
import Category from "../../components/Home/Category";
import PopulerBusinesslist from "../../components/Home/PopulerBusinesslist";

export default function home() {
  return (
    <ScrollView>
      {/* Header */}
      <Header />

      {/* Silder */}
      <Slider />
      {/* Category */}
      <Category/>

      {/* Populer Business List */}
      <PopulerBusinesslist/>
      <View style={{height:50}}>

      </View>
    </ScrollView>
  );
}
