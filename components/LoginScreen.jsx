import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useCallback, useEffect } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import * as WebBrowser from "expo-web-browser";

import { useOAuth } from "@clerk/clerk-expo";
// import * as Linking from "expo-linking";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({});
      console.log("OAuth Response:", { createdSessionId, signIn, signUp });
      
      if (createdSessionId) {
        setActive({ session: createdSessionId });
        console.log("Session Activated:", createdSessionId);
      } else {
        console.log("Sign-in or Sign-up needed", { signIn, signUp });
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  

  return (
    <View>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 100,
        }}
      >
        <Image
          source={require("../assets/images/loginscreen.png")}
          style={{
            width: 300,
            height: 450,
            borderRadius: 20,
          }}
        />
      </View>
      <View
        style={{
          backgroundColor: "#F4AA56",
          borderRadius: 20,
          padding: 10,
        }}
      >
        <TouchableOpacity style={styles.btn} onPress={onPress}>
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Sign Free
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.primary || "#6200EE", // Fallback color if Colors.primary is undefined
    padding: 10,
    borderRadius: 99,
    marginTop: 10,
  },
});
