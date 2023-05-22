import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SignupScreen from "./screens/SignupScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import AddChat from "./screens/AddChatScreen";
import ChatScreen from "./screens/ChatScreen";
const Stack = createStackNavigator();
function ChatStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: true,

          title: "LoginScreen",
          headerStyle: {
            backgroundColor: "#2F80ED",
          },
          headerTintColor: "#FFFF",
          headerTitleStyle: {
            textAlign: "center",
          },
        }}
        component={LoginScreen}
        name="LoginScreen"
      />
      <Stack.Screen
        options={{
          headerShown: true,

          title: "SignupScreen",
          headerStyle: {
            backgroundColor: "#2F80ED",
          },
          headerTintColor: "#FFFF",
          headerTitleStyle: {
            textAlign: "center",
          },
        }}
        component={SignupScreen}
        name="SignupScreen"
      />
      <Stack.Screen
        options={{
          headerShown: true,

          title: "Message",
          headerStyle: {
            backgroundColor: "#2F80ED",
          },
          headerTintColor: "#FFFF",
          headerTitleStyle: {
            textAlign: "center",
          },
        }}
        component={HomeScreen}
        name="HomeScreen"
      />
      <Stack.Screen
        options={{
          headerShown: true,

          title: "AddChat",
          headerStyle: {
            backgroundColor: "#2F80ED",
          },
          headerTintColor: "#FFFF",
          headerTitleStyle: {
            textAlign: "center",
          },
        }}
        component={AddChat}
        name="AddChat"
      />
       <Stack.Screen
        options={{
          headerShown: true,

          title: "ChatScreen",
          headerStyle: {
            backgroundColor: "#2F80ED",
          },
          headerTintColor: "#FFFF",
          headerTitleStyle: {
            textAlign: "center",
          },
        }}
        component={ChatScreen}
        name="ChatScreen"
      />
      {/*               backgroundColor: "#4838D1",
       */}
    </Stack.Navigator>
  );
}
function RootNavigator() {
  return (
    <NavigationContainer>
      <ChatStack />
    </NavigationContainer>
  );
}
export default function App() {
  return <RootNavigator />;
}
