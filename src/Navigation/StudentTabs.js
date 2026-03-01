import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StudentHome from "../Screens/StudentHome";
import StudentRegistered from "../Screens/StudentRegistered";
import { Ionicons } from "@expo/vector-icons";
const Tab  = createBottomTabNavigator();


function StudentTabs(){
    return <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
    
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
    
              if (route.name === "studenthome") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "registered") {
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
          })} >
        <Tab.Screen name = "studenthome" component={StudentHome}/>
        <Tab.Screen name = "registered" component={StudentRegistered}/>
    </Tab.Navigator>
}
export default StudentTabs;