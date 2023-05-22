import { Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { Input } from "@rneui/themed";
import { db } from "../config/firebase";
import Icon from "react-native-vector-icons/Ionicons";
import { Button } from "@rneui/base";

export default function AddChatScreen({ navigation }) {
  const [input, setInput] = useState("");
  //
 



  //

  // const [userList, setUserList] = useState([]);
  // const fetchUserList = async () => {
  //   try {
  //     const snapshot = await db.collection("users").get();
  //     const users = snapshot.docs.map((doc) => doc.data());
  //     console.log(users); // In ra dữ liệu người dùng
  //     setUserList(users);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchUserList();
  // }, []);

  const createChats = async () => {
    await db
      .collection("chats")
      .add({
        chatName: input,
      })
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => alert(error)());
  };

  return (
    <>
      <View>
        <Input
          placeholder="Enter a chat name"
          leftIcon={
            <Icon name="chatbubble-outline" size={20} color={"#4F5E7B"} />
          }
          onChangeText={(text) => setInput(text)}
          onSubmitEditing={createChats}
          value={input}
          rightIcon={<Icon name="close" size={20} />}
        />


        <Button
          onPress={createChats}
          title="Create a new Chat"
          titleStyle={{ fontWeight: "500" }}
          buttonStyle={{
            backgroundColor: "rgba(90, 154, 230, 1)",
            borderColor: "transparent",
            borderWidth: 0,
          }}
          containerStyle={{
            width: "100%",
            height: 45,
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </View>
    </>
  );
}
