import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  UIManager,
  Platform,
  ScrollView,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BASE_URL from "../Api/Api";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function AdminHome() {

  const [events, setEvents] = useState([]);
  const [active, setActive] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch(BASE_URL + "?action=events");
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.log("Fetch Error:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.deadline) - new Date(a.deadline)
  );

  const handlePress = (index) => {
    LayoutAnimation.easeInEaseOut();
    setActive(active === index ? null : index);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchEvents();
  };

  
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={{ marginTop: 10 }}>Loading Events...</Text>
      </View>
    );
  }

  return (
  <LinearGradient
    colors={["#0F2027", "#1c1f2b", "#111827"]}
    style={{ flex: 1 }}
  >
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />
      }
    >
      {sortedEvents.map((event, index) => {
        const expanded = active === index;

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

    <View style={styles.badge}>
      <Text style={styles.badgeText}>
        {event.registered || 0}
      </Text>
    </View>
  </View>

  {!expanded && (
    <>
      <Text style={styles.shortDesc}>{event.shortDesc}</Text>

      <View style={styles.deadlinePill}>
        <Text style={styles.deadlineText}>
         {new Date(event.deadline).toLocaleDateString()}
        </Text>
      </View>
    </>
  )}

  {expanded && (
    <View style={styles.expandedContainer}>
      <Text style={styles.longDesc}>{event.longDesc}</Text>

      <View style={styles.outcomeBox}>
        <Text style={styles.outcomeText}>
          {event.outcome}
        </Text>
      </View>

      <View style={styles.deadlinePillExpanded}>
        <Text style={styles.deadlineText}>
          Deadline: {new Date(event.deadline).toLocaleDateString()}
        </Text>
      </View>
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
    padding: 20,
    paddingTop: 30,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  activeCard: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderColor: "#3b82f6",
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 8,
  },

  shortDesc: {
    color: "#cbd5e1",
    marginBottom: 10,
  },

  longDesc: {
    color: "#e5e7eb",
    marginBottom: 12,
    lineHeight: 20,
  },

  expandedContainer: {
    marginTop: 10,
  },

  outcomeBox: {
    backgroundColor: "rgba(59,130,246,0.1)",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },

  outcomeText: {
    color: "#93c5fd",
  },

  deadlinePill: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.08)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  deadlinePillExpanded: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(59,130,246,0.15)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },

  deadlineText: {
    color: "#fff",
    fontSize: 12,
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
  fontSize: 12,
  fontWeight: "600",
},
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0F2027"
  },
  titleRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
},
});