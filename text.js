import React, { useEffect, useLayoutEffect, useState } from "react";
import { Text, View } from "react-native";
import { auth, db } from "../config/firebase";
import { Avatar } from "@rneui/base";
import Icon from "react-native-vector-icons/Ionicons";
import firestore from "@react-native-firebase/firestore";

export default function Home({ navigation }) {
  const [lastActiveMinutes, setLastActiveMinutes] = useState(null);
  const [status, setStatus] = useState("");

  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(auth.currentUser.uid)
      .onSnapshot((snapshot) => {
        const user = snapshot.data();
        if (user && user.lastActiveTimestamp) {
          const lastActiveTime = user.lastActiveTimestamp.toDate();
          const currentTime = new Date();
          const diffInMinutes = Math.floor(
            (currentTime - lastActiveTime) / (1000 * 60)
          );
          setLastActiveMinutes(diffInMinutes);

          if (diffInMinutes <= 5) {
            setStatus("Đang hoạt động");
          } else {
            setStatus(`Không hoạt động (${diffInMinutes} phút)`);
          }
        }
      });

    return () => unsubscribe();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "left",
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            onPress={signOutUser}
            rounded
            source={{ uri: auth?.currentUser?.photoURL }}
          />
          <Text style={{ fontSize: 18, color: "#FFFF", paddingLeft: 12 }}>
            {auth.currentUser.displayName}
          </Text>
        </View>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", marginRight: 20 }}>
          <Icon name="chatbubbles-sharp" size={25} color={"#FFFF"} />
        </View>
      ),
    });
  });

  return (
    <View>
      <Text>Home</Text>
      <Text>Trạng thái: {status}</Text>
    </View>
  );
}
