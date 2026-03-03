import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  LayoutAnimation,
  UIManager,
  Platform,
  Alert,
  ActivityIndicator
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BASE_URL from "../Api/Api";

const API = BASE_URL;

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function StudentHome({route}){
  const user = route?.params?.user;
  
  const [events,setEvents] = useState([])
  const [active,setActive] = useState(null)
  const [loading,setLoading] = useState(true)
  const [registeredEvents,setRegisteredEvents] = useState([])

  useEffect(()=>{
    fetchEvents()
    loadRegisteredEvents()
  },[])

const loadRegisteredEvents = async () => {
  try {
    const data = await AsyncStorage.getItem(
      `registeredEvents_${user.email}`
    );
    if (data) {
      setRegisteredEvents(JSON.parse(data));
    }
  } catch (err) {
    console.log("AsyncStorage load error", err);
  }
};

  const fetchEvents = async ()=>{

    try{
      setLoading(true)

      const res = await fetch(API+"?action=events")
      const data = await res.json()

      const sorted = data.sort(
        (a,b)=> new Date(b.deadline) - new Date(a.deadline)
      )

      setEvents(sorted)

    }catch(err){
      console.log(err)
      Alert.alert("Error","Failed to load events")
    }finally{
      setLoading(false)
    }

  }

const registerEvent = async (eventId) => {

  if (registeredEvents.includes(eventId)) {
    Alert.alert("Already Registered", "You have already registered for this event");
    return;
  }

  try {

    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "registerEvent",
        eventId,
        email: user.email   
      })
    });

    const updated = [...registeredEvents, eventId];
    setRegisteredEvents(updated);

    try {
      await AsyncStorage.setItem(
        `registeredEvents_${user.email}`,   
        JSON.stringify(updated)
      );
    } catch (storageError) {
      console.log("Storage error", storageError);
    }

    Alert.alert("Success", "Registered Successfully");

  } catch (err) {
    console.log(err);
    Alert.alert("Error", "Registration failed");
  }
};
  const handlePress = (index)=>{
    LayoutAnimation.easeInEaseOut()
    setActive(active === index ? null : index)
  }

if (!user) {
  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <Text>No user data. Please login again.</Text>
    </View>
  );
}

  if(loading){
    return(
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={{marginTop:10}}>Loading events...</Text>
      </View>
    )
  }

  return (
  <LinearGradient
    colors={["#0f172a", "#111827", "#0b1120"]}
    style={{ flex: 1 }}
  >
    <ScrollView contentContainerStyle={styles.container}>

      {events.map((event, index) => {

        const expanded = active === index;
        const isRegistered = registeredEvents.includes(event.eventId);

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.9}
            onPress={() => handlePress(index)}
          >
            <View style={[styles.card, expanded && styles.activeCard]}>

              {/* TITLE ROW */}
              <View style={styles.titleRow}>
                <Text style={styles.title}>{event.title}</Text>

                {isRegistered && (
                  <View style={styles.registeredBadge}>
                    <Text style={styles.registeredText}>✓</Text>
                  </View>
                )}
              </View>

              {!expanded && (
                <>
                  <Text style={styles.short}>{event.shortDesc}</Text>

                  <View style={styles.deadlinePill}>
                    <Text style={styles.deadlineText}>
                  {new Date(event.deadline).toLocaleDateString()}
                    </Text>
                  </View>
                </>
              )}

              {expanded && (
                <View style={styles.expandedSection}>

                  <Text style={styles.long}>{event.longDesc}</Text>

                  <View style={styles.outcomeBox}>
                    <Text style={styles.outcome}>
                      {event.outcome}
                    </Text>
                  </View>

                  <View style={styles.deadlinePillExpanded}>
                    <Text style={styles.deadlineText}>
                      Deadline: {new Date(event.deadline).toLocaleDateString()}
                    </Text>
                  </View>

                  <TouchableOpacity
                    activeOpacity={0.85}
                    disabled={isRegistered}
                    onPress={() => registerEvent(event.eventId)}
                  >
                    <LinearGradient
                      colors={
                        isRegistered
                          ? ["#6b7280", "#6b7280"]
                          : ["#3b82f6", "#6366f1"]
                      }
                      style={styles.button}
                    >
                      <Text style={styles.buttonText}>
                        {isRegistered
                          ? "Already Registered"
                          : "Register"}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>

                </View>
              )}

            </View>
          </TouchableOpacity>
        );
      })}

    </ScrollView>
  </LinearGradient>
);
}

const styles = StyleSheet.create({

  container: {
    padding: 24,
    paddingTop: 30,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f172a"
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 22,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  activeCard: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderColor: "#3b82f6",
  },

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    flex: 1,
    marginRight: 10,
  },

  short: {
    fontSize: 14,
    color: "#cbd5e1",
    marginBottom: 12,
    lineHeight: 18,
  },

  long: {
    fontSize: 14,
    color: "#e5e7eb",
    marginBottom: 14,
    lineHeight: 20,
  },

  outcomeBox: {
    backgroundColor: "rgba(59,130,246,0.12)",
    padding: 12,
    borderRadius: 14,
    marginBottom: 14,
  },

  outcome: {
    color: "#93c5fd",
    fontStyle: "italic",
  },

  deadlinePill: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.08)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  deadlinePillExpanded: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(59,130,246,0.18)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
  },

  deadlineText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "500",
  },

  registeredBadge: {
    backgroundColor: "rgba(34,197,94,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.4)",
  },

  registeredText: {
    color: "#22c55e",
    fontWeight: "600",
    fontSize: 12,
  },

  expandedSection: {
    marginTop: 10,
  },

  button: {
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
  },

  buttonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 15,
  },

});