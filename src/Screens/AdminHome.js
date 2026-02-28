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
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
              <Text style={styles.title}>{event.title}</Text>

              {!expanded && (
                <>
                  <Text>{event.shortDesc}</Text>
                  <Text>Deadline: {event.deadline}</Text>
                </>
              )}

              {expanded && (
                <>
                  <Text>{event.longDesc}</Text>
                  <Text>{event.outcome}</Text>
                  <Text>Deadline: {event.deadline}</Text>
                </>
              )}
            </View>
          </TouchableOpacity>
        );

      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f4f6fa"
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 4
  },
  activeCard: {
    transform: [{ scale: 1.05 }],
    elevation: 10
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6
  }
});