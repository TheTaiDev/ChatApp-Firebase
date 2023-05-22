import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  FlatList,
  StatusBar,
  Text,
  View,
} from "react-native";
import React, { Component, useLayoutEffect, useRef, useState } from "react";
import { Avatar } from "@rneui/base";
import { auth, db } from "../config/firebase";
import {
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";

export default function ChatScreen({ navigation, route }) {
  const [input, setInput] = useState("");
  const [messages, setMessage] = useState([]);


  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chats",
      headerTitleAlign: "left",
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar
            rounded
            source={{
              uri:
                messages.length > 0 && messages[0]?.data.photoURL
                  ? messages[0]?.data.photoURL
                  : "https://example.com/default-avatar.jpg",
            }}
          />
          <Text
            style={{
              color: "#FFFF",
              fontWeight: 700,
              marginLeft: 10,
              fontSize: 16,
            }}
          >
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={24} color={"#FFFF"} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={24} color={"#FFFF"} />
          </TouchableOpacity>
        </View>
      ),
    });
  });
  const sendMess = () => {

    Keyboard.dismiss();
    addDoc(collection(db, "chats", route.params.id, "messages"), {
      timestamp: serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });

    setInput("");
  };
  useLayoutEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "chats", route.params.id, "messages"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) =>
        setMessage(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
    );

    return () => {
      unsubscribe();
    };
  }, [route]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFF" }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} />

        <FlatList
        
          data={messages.slice(0).reverse()}
          keyExtractor={({ id }) => id}
          renderItem={({ item: { id, data } }) =>
            data.email === auth.currentUser.email ? (
              <View
                key={id}
                style={{
                  padding: 10,
                  backgroundColor: "#ECECEC",
                  alignSelf: "flex-end",
                  borderRadius: 20,
                  marginRight: 15,
                  marginBottom: 20,
                  maxWidth: "80%",
                  position: "relative",
                }}
              >
                <Avatar
                  containerStyle={{
                    bottom: -15,
                    right: -5,
                    position: "absolute",
                  }}
                  bottom={-15}
                  right={-5}
                  position="absolute"
                  rounded
                  size={25}
                  source={{
                    uri: data.photoURL,
                  }}
                />
                <Text
                  style={{
                    color: "black",
                    fontWeight: 500,
                    marginLeft: 10,
                    fontSize: 16,
                  }}
                >
                  {" "}
                  {data.message}{" "}
                </Text>
                {/*  */}
              </View>
            ) : (
              //   sender

              <View
                key={id}
                style={{
                  padding: 10,
                  backgroundColor: "#2F80ED",
                  alignSelf: "flex-start",
                  borderRadius: 20,
                  marginLeft: 15,
                  maxWidth: "80%",
                  marginBottom: 20,
                  color: "#FFFFFF",
                  position: "relative",
                }}
              >
                <Avatar
                  containerStyle={{
                    bottom: -15,
                    right: -5,
                    position: "absolute",
                  }}
                  bottom={-15}
                  right={-5}
                  position="absolute"
                  rounded
                  size={25}
                  source={{
                    uri: data.photoURL,
                  }}
                  // source={{
                  //   uri: data.photoURL,
                  // }}
                />
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontWeight: 500,
                    marginLeft: 10,
                    fontSize: 16,
                  }}
                >
                  {" "}
                  {data.message}{" "}
                </Text>
              </View>
            )
          }
          contentContainerStyle={{
            paddingTop: 15,
            flexGrow: 1,
            justifyContent: "flex-end",
          }}
          inverted={false}
        />
        {/*  */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            padding: 20,
          }}
        >
          <TextInput
            style={{
              bottom: 0,
              height: 40,
              marginRight: 15,
              borderTopColor: "transparent",
              backgroundColor: "#ECECEC",
              flex: 1,
              padding: 10,
              color: "grey",
              borderRadius: 30,
            }}
            value={input}
            onChangeText={(text) => setInput(text)}
            onSubmitEditing={sendMess}
            placeholder="Enter Messenger"
          />
          <TouchableOpacity onPress={sendMess} activeOpacity={0.5}>
            <Ionicons name="send" size={24} color={"#2F80ED"} />
          </TouchableOpacity>
        </View>

        <TouchableWithoutFeedback />
        {/* <Text>{route.params.chatName}</Text> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
