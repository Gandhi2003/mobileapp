import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useNavigation } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "../../constants/Colors";
import RNPickerSelect from "react-native-picker-select";
import { db, storage } from "../../configs/FirebaseConfig";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";

export default function AddBusiness() {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [CategoryList, setCategoryList] = useState([]);
    const{user}=useUser()

  const [name, setName] = useState();
  const [addrs, setAddrs] = useState();
  const [contact, setContact] = useState();
  const [email, setEmail] = useState();
  const [website, setWebsit] = useState();
  const [about, setAbout] = useState();
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add  New Business",
      headerShown: true,
    });
    GetCategoryList();
  }, []);
  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    setImage(result?.assets[0].uri);
  };
  const GetCategoryList = async () => {
    const q = query(collection(db, "Category"));
    const Querys = await getDocs(q);
    Querys.forEach((doc) => {
      setCategoryList((prev) => [
        ...prev,
        {
          label: doc.data().name,
          value: doc.data().name,
        },
      ]);
    });
  };
  const oSubmitBusiness = async () => {
    setLoading(true);
    const fileName = Date.now().toString() + ".jpg";
    const resp = await fetch(image);
    const blob = await resp.blob();

    const imageRef = ref(storage, "business-app/" + fileName);
    uploadBytes(imageRef, blob)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!");
      })
      .then((resp) => {
        getDownloadURL(imageRef).then(async (downloadUrl) => {
          saveBusiness(downloadUrl);
        });
      });
  };

  const saveBusiness = async (imageUrl) => {
    await setDoc(doc(db, "BusinessList", Date.now().toString()), {
      name: name,
      address: addrs,
      contact: contact,
      email: email,
      website: website,
      about: about,
      category: category,
      imageUrl: imageUrl,
      username: user.fullName,
      userEmail: user.primaryEmailAddress.emailAddress,
      userImage: user.imageUrl,
    });
    setLoading(false);
    router.back()
    ToastAndroid.show("New Business Added...", ToastAndroid.LONG);
  };
  return (
    <ScrollView
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 25,
          fontFamily:"outfit-bold"
        }}
      >
        Add New Business
      </Text>
      <Text style={{ color: "gray",fontFamily:"outfit-medium" }}>
        Fill all details in order to add new business
      </Text>
      <TouchableOpacity
        onPress={() => onImagePick()}
        style={{
          marginTop: 20,
        }}
      >
        {!image ? (
          <Image
            source={require("../../assets/images/img.png")}
            style={{
              width: 100,
              height: 100,
            }}
          />
        ) : (
          <Image
            source={{ uri: image }}
            style={{
              width: 100,
              height: 100,
            }}
          />
        )}
      </TouchableOpacity>
      <View>
        <TextInput
          placeholder="Name"
          onChangeText={(v) => setName(v)}
          style={{
            padding: 10,
            borderRadius: 5,
            borderWidth: 1,
            backgroundColor: "white",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily:"outfit-medium"
          }}
        />
        <TextInput
          placeholder="Address"
          onChangeText={(v) => setAddrs(v)}
          style={{
            padding: 10,
            borderRadius: 5,
            borderWidth: 1,
            backgroundColor: "white",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily:"outfit-medium"
          }}
        />
        <TextInput
          placeholder="Contact"
          onChangeText={(v) => setContact(v)}
          style={{
            padding: 10,
            borderRadius: 5,
            borderWidth: 1,
            backgroundColor: "white",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily:"outfit-medium"
          }}
        />
        <TextInput
          placeholder="website"
          onChangeText={(v) => setWebsit(v)}
          style={{
            padding: 10,
            borderRadius: 5,
            borderWidth: 1,
            backgroundColor: "white",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily:"outfit-medium"
          }}
        />
        <TextInput
          placeholder="Email"
          onChangeText={(v) => setEmail(v)}
          style={{
            padding: 10,
            borderRadius: 5,
            borderWidth: 1,
            backgroundColor: "white",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily:"outfit-medium"
          }}
        />
        <TextInput
          multiline
          numberOfLines={5}
          placeholder="About"
          onChangeText={(v) => setAbout(v)}
          style={{
            padding: 10,
            borderRadius: 5,
            fontSize: 17,
            borderWidth: 1,
            backgroundColor: "white",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            height: 100,
            fontFamily:"outfit-medium"
          }}
        />
        <View
          style={{
            borderRadius: 5,

            borderWidth: 1,
            backgroundColor: "white",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
          }}
        >
          <RNPickerSelect
            onValueChange={(value) => setCategory(value)}
            items={CategoryList}
          />
        </View>
      </View>
      <TouchableOpacity
        disabled={loading}
        onPress={() => oSubmitBusiness()}
        style={{
          padding: 10,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 5,
          marginTop: 20,
        }}
      >
        {loading ? (
          <ActivityIndicator size={"large"} color={"white"} />
        ) : (
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontFamily:"outfit-medium"
            }}
          >
            Submit
          </Text>
        )}
      </TouchableOpacity>
      <View style={{ height: 100 }}></View>
    </ScrollView>
  );
}
