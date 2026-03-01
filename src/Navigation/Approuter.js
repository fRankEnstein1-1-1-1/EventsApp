import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StudentTabs from "./StudentTabs"
import Login from "../Screens/Login";
import SignUp from "../Screens/SignUp";
import AdminTabs from "./AdminTabs";
const Stack = createNativeStackNavigator();

export default function Approuter() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"  screenOptions={{
    headerStyle: {
      backgroundColor: "#3b82f6",
    },
    headerTitleStyle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#fff",
    },
    headerTintColor: "#722424",
    headerTitleAlign: "left",
  }} >
        <Stack.Screen 
          name="Login" 
          component={Login} 
        />
        <Stack.Screen 
          name="Signup" 
          component={SignUp} 
        />

        <Stack.Screen
        name="Admin"
        component = {AdminTabs}/>
        
         <Stack.Screen
      name = "Student"
     component={StudentTabs}/>
      </Stack.Navigator>
     
    </NavigationContainer>
  );
}