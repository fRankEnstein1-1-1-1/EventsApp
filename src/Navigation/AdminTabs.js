import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import AdminHome from "../Screens/AdminHome";
import CreateEvent from "../Screens/CreateEvent";

const Tab = createBottomTabNavigator();

export default function AdminTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "AdminHome") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "CreateEvent") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          }

          return <Ionicons name={iconName} size={22} color={color} />;
        },

        tabBarActiveTintColor: "#3b82f6",
        tabBarInactiveTintColor: "#9ca3af",

        tabBarStyle: {
          backgroundColor: "#ffffff",
          height: 65,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          elevation: 10,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginBottom: 6,
        },
      })}
    >
      <Tab.Screen 
        name="AdminHome" 
        component={AdminHome} 
        options={{ title: "Dashboard" }}
      />
      
      <Tab.Screen 
        name="CreateEvent" 
        component={CreateEvent} 
        options={{ title: "Create" }}
      />
    </Tab.Navigator>
  );
}