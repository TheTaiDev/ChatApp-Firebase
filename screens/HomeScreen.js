import React, { useEffect, useLayoutEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { auth, db } from "../config/firebase";
import { Avatar } from "@rneui/base";
import Icon from "react-native-vector-icons/Ionicons";
import Chat from "../compent/Chat";
import firebase from "firebase/compat";
import { ScrollView } from "react-native-gesture-handler";
import Swipeable from "react-native-swipeable";

export default function HomeScreen({ navigation, route, chatName }) {

  const [activityMinutes, setActivityMinutes] = useState(0);
  const [isInactive, setIsInactive] = useState(false);
  const [inactiveStart, setInactiveStart] = useState(null);

  useEffect(() => {
    let startTimestamp = Date.now(); // Thời điểm bắt đầu đăng nhập

    const interval = setInterval(() => {
      const currentTimestamp = Date.now();
      const elapsedMinutes = Math.floor(
        (currentTimestamp - startTimestamp) / (1000 * 60)
      );

      setActivityMinutes(elapsedMinutes);

      if (elapsedMinutes < 5) {
        setIsInactive(false);
        setInactiveStart(null); // Reset thời điểm bắt đầu ngừng hoạt động
      } else {
        if (!isInactive && !inactiveStart) {
          setInactiveStart(startTimestamp); // Lưu thời điểm bắt đầu ngừng hoạt động
        }
        setIsInactive(true);
      }
    }, 60000); // Cập nhật thời gian hoạt động mỗi 1 phút

    return () => clearInterval(interval); // Hủy interval khi component unmount
  }, []);
  const calculateInactiveMinutes = () => {
    if (inactiveStart) {
      const currentTimestamp = Date.now();
      const elapsedMinutes = Math.floor(
        (currentTimestamp - inactiveStart) / (1000 * 60)
      );
      return elapsedMinutes;
    }
    return 0;
  };

  //

  const [chats, setChats] = useState([]);
  useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return () => {
      unsubscribe(); // Unsubscribe from the snapshot listener when component unmounts
    };
  }, []);
  const enterChat = (id, chatName) => {
    navigation.navigate("ChatScreen", {
      id: id,
      chatName: chatName,
    });
  };
  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("LoginScreen");
    });
  };


  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "left",
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar
            onPress={signOutUser}
            rounded
            source={{ uri: auth?.currentUser?.photoURL }}
          />

          {/*  */}

          <View
            style={{
              paddingLeft: 10,
            }}
          >
            <Text style={{ fontSize: 18, color: "#FFFF" }}>
              {auth?.currentUser?.displayName}
            </Text>
            {isInactive ? (
              <Text style={{ fontSize: 12, color: "#FFFF" }}>
                Ngừng hoạt động {calculateInactiveMinutes()} phút
              </Text>
            ) : (
              <Text style={{ fontSize: 12, color: "#FFFF" }}>
                Đang hoạt động
              </Text>
            )}
          </View>
        </View>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", marginRight: 20 }}>
          <Icon
            onPress={() => navigation.navigate("AddChat")}
            name="chatbubbles-sharp"
            size={25}
            color={"#FFFF"}
          />
        </View>
      ),
    });
  });
  //

  //
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F7F7F7",
        height: "100%",
      }}
    >
      <ScrollView>
        {chats.map(({ id, data: { chatName } }) => (
          <Chat enterChat={enterChat} key={id} id={id} chatName={chatName} />
        ))}
      </ScrollView>
    </View>
  );
}
