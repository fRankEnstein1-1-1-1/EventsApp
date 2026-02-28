import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StudentHome from "../Screens/StudentHome";
import StudentRegistered from "../Screens/StudentRegistered";

const Tab  = createBottomTabNavigator();


function StudentTabs(){
    return <Tab.Navigator>
        <Tab.Screen name = "studenthome" component={StudentHome}/>
        <Tab.Screen name = "registered" component={StudentRegistered}/>
    </Tab.Navigator>
}
export default StudentTabs;