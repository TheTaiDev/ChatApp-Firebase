import { Text, View } from "react-native";
import React, { Component, useEffect, useState } from "react";
import { ListItem, Avatar } from "@rneui/base";
import { auth, db } from "../config/firebase";
export default function Chat({ id, chatName, enterChat, messages, navigation }) {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChatMessages(snapshot.docs.map((doc) => doc.data()))
      );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ListItem
      top={0}
      onPress={() => enterChat(id, chatName, messages)}
      key={id}
      bottomDivider
      containerStyle={{
        borderRadius: 18,
        marginTop: 15,
      }}
    >
      <Avatar
        rounded
        source={{
          uri:
            chatMessages[0]?.photoURL ||
            "https://thumbs.dreamstime.com/b/avatar-icon-social-icon-exclamation-mark-avatar-icon-alert-error-alarm-danger-symbol-avatar-icon-social-icon-118920146.jpg",
        }}
      />
      <ListItem.Content>
        <ListItem.Title>{chatName}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1}>{messages}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}
