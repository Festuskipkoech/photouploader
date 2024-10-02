import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterForm from "./screens/RegisterForm";
import ProfilePage from "./screens/ProfilePage";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen name="Register" component={RegisterForm}></Stack.Screen>
        <Stack.Screen name="Profile" component={ProfilePage}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
  
}