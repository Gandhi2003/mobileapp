import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../../constants/Colors";
import { Rating } from "react-native-ratings";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
export default function Reviews({ business }) {
    
  const [rating, setRating] = useState(4);
  const [userInput, setUserInput] = useState("");
    const { user } = useUser();
  const onSubmit = async () => {
    const docRef = doc(db, "BusinessList", business.id);
    await updateDoc(docRef, {
      reviews: arrayUnion({
        rating: rating,
        comment: userInput,
        userName: user?.fullName,
        userImage: user?.imageUrl,
        userEmail:user?.primaryEmailAddress?.emailAddress,
      }),
    });
    ToastAndroid.show("Thank you for your review", ToastAndroid.BOTTOM);
  };

  return (
    <View
      style={{
        padding: 20,
        backgroundColor: "#fff",
      }}
    >
      <Text style={{ fontSize: 20 }}>Reviews</Text>
      <View>
        <Rating
          count={5}
          defaultRating={rating}
          size={20}
          showRating={false}
          onFinishRating={(rating) => setRating(rating)}
          style={{ paddingVertical: 10 }}
        />

        <TextInput
          numberOfLines={4}
          placeholder="Write your comment"
          onChangeText={(value) => setUserInput(value)}
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            textAlignVertical: "top",
            borderColor: "#ddd",
          }}
        />

        <TouchableOpacity
          disabled={!userInput}
          onPress={() => onSubmit()}
          style={{
            padding: 10,
            borderRadius: 6,
            backgroundColor: Colors.PRIMARY,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontFamily:"outfit-medium",
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>

      {/* Display previous reviews */}

      <View>
        {business?.reviews?.map((item, index) => (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              padding: 10,
              borderWidth: 1,
              borderColor: "red",
              borderRadius: 15,
              marginTop: 10,
            }}
          >
            <Image
              source={{ uri: item.userImage }}
              style={{ width: 50, height: 50, borderRadius: 99 }}
            />

            <View style={{ display: "flex", gap: 5 }}>
              <Text style={{ fontSize: 20 ,fontFamily:"outfit-bold"}}>{item.userName}</Text>
              <Rating
                imageSize={20}
                ratingCount={item.rating}
                style={{ alignItems: "flex-start" }}
              />
          
              <Text style={{fontFamily:"outfit-medium"}}>{item.comment}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
