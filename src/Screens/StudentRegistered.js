import React,{useEffect,useState} from "react"
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator
} from "react-native"
import { LinearGradient } from "expo-linear-gradient";
import BASE_URL from "../Api/Api"
const API=BASE_URL

export default function StudentRegistered(){

  const [events,setEvents] = useState([])
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    fetchRegistered()
  },[])

  const fetchRegistered = async ()=>{

    try{
      const res = await fetch(API+"?action=registered&email=student@email.com")
      const data = await res.json()

      // descending irder mein sort ( acc. date )
      const sorted = data.sort(
        (a,b)=> new Date(b.deadline) - new Date(a.deadline)
      )

      setEvents(sorted)

    }catch(err){
      console.log(err)
    }finally{
      setLoading(false)
    }
  }

  if(loading){
    return(
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    )
  }

  return (
  <LinearGradient
    colors={["#0f172a", "#111827", "#0b1120"]}
    style={{ flex: 1 }}
  >
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.heading}>My Registered Events</Text>

      {events.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            You haven't registered for any events yet.
          </Text>
        </View>
      ) : (
        events.map((event, index) => (
          <View key={index} style={styles.card}>

            {/* Title Row */}
            <View style={styles.titleRow}>
              <Text style={styles.title}>{event.title}</Text>

              <View style={styles.badge}>
                <Text style={styles.badgeText}>Registered ✓</Text>
              </View>
            </View>

            <Text style={styles.desc}>{event.shortDesc}</Text>

            <View style={styles.deadlinePill}>
              <Text style={styles.deadlineText}>
                {event.deadline}
              </Text>
            </View>

          </View>
        ))
      )}

    </ScrollView>
  </LinearGradient>
);

}

const styles = StyleSheet.create({

  container: {
    padding: 24,
    paddingTop: 30,
    flexGrow: 1,
  },

  heading: {
    fontSize: 24,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 24,
    letterSpacing: 0.5,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    flex: 1,
    marginRight: 10,
  },

  desc: {
    fontSize: 14,
    color: "#cbd5e1",
    marginBottom: 12,
    lineHeight: 18,
  },

  deadlinePill: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(59,130,246,0.15)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  deadlineText: {
    color: "#93c5fd",
    fontSize: 12,
    fontWeight: "500",
  },

  badge: {
    backgroundColor: "rgba(34,197,94,0.15)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.4)",
  },

  badgeText: {
    color: "#22c55e",
    fontWeight: "600",
    fontSize: 12,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
  },

  emptyText: {
    color: "#9ca3af",
    fontSize: 15,
    textAlign: "center",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f172a",
  },

});