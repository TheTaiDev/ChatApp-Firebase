import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase";
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubrice = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("HomeScreen");
      }
    });
    return unsubrice;
  }, []);
  const signIn = () => {
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      if (error.code === "auth/user-not-found") {
        // Người dùng không tồn tại
        setError("Người dùng không tồn tại");
      } else if (error.code === "auth/wrong-password") {
        // Sai mật khẩu
        setError("Sai mật khẩu");
      } else if (error.code === "auth/invalid-email") {
        // Email không hợp lệ
        setError("Email không hợp lệ");
      }
    });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          width: "90%",
          justifyContent: "center",
          marginHorizontal: 20,
          alignItems: "center",
          marginTop: 50,
          flexDirection: "row",
        }}
      ></View>
      {/* form input */}
      <View
        style={{
          width: "90%",
          marginTop: 30,
          // backgroundColor: "red",
          marginHorizontal: 30,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 16,
              color: "#2E2E5D",
              lineHeight: 24,
              fontWeight: 600,
              // fontStyle: "normal",
            }}
          >
            Login to Your Account
          </Text>
        </View>
        <View
          style={{
            paddingTop: 32,
            gap: 20,
          }}
        >
          <TextInput
            autoFocus
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
            style={{
              width: 350,
              borderRadius: 8,
              fontSize: 14,
              lineHeight: 25,
              color: "#000000",
              paddingLeft: 30,
              height: 60,
              backgroundColor: "#F5F5FA",
            }}
          ></TextInput>
          <TextInput
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Password"
            style={{
              width: 350,
              borderRadius: 8,
              fontSize: 14,
              lineHeight: 25,
              color: "#000000",
              paddingLeft: 30,
              height: 60,
              backgroundColor: "#F5F5FA",
            }}
          ></TextInput>
          {error !== "" && (
            <Text style={{ color: "#F77A55", fontSize: 14 }}>{error}</Text>
          )}

          <TouchableOpacity
            onPress={signIn}
            style={{
              width: 350,
              height: 60,
              backgroundColor: "#4838D1",

              borderRadius: 8,
              alignItems: "center",

              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                lineHeight: 24,
                textAlign: "center",
                fontWeight: 500,
                color: "#FFFFFF",
              }}
            >
              Login{" "}
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              paddingLeft: 210,
              fontWeight: 700,
              lineHeight: 24,
              color: "#F77A55",
              fontSize: 16,
            }}
          >
            Forget Password ?
          </Text>
          {/* or login width */}
        </View>
        {/*  */}
        <View
          style={{
            flexDirection: "row",
            marginTop: 30,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontWeight: 400,
              lineHeight: 24,
              color: "#2E2E5D",
              fontSize: 16,
              paddingRight: 8,
            }}
          >
            Don’t have an accoun’t ?
          </Text>
          <Text
            onPress={() => {
              navigation.navigate("SignupScreen");
            }}
            style={{
              fontWeight: 700,
              lineHeight: 24,
              color: "#F77A55",
              fontSize: 16,
            }}
          >
            Register
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
