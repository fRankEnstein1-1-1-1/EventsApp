import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AdminHome from "../Screens/AdminHome";
import CreateEvent from "../Screens/CreateEvent";

const Tab = createBottomTabNavigator();

export default function AdminTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="AdminHome" component={AdminHome} />
      <Tab.Screen name="CreateEvent" component={CreateEvent} />
    </Tab.Navigator>
  );
}