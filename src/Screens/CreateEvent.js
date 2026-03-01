import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import BASE_URL from "../Api/Api";
export default function CreateEvent() {

  const API = BASE_URL;

  const [title,setTitle] = useState("");
  const [shortDesc,setShortDesc] = useState("");
  const [longDesc,setLongDesc] = useState("");
  const [outcome,setOutcome] = useState("");
  const [deadline,setDeadline] = useState("");

  const createEvent = async () => {

    if(!title || !shortDesc || !longDesc || !deadline){
      Alert.alert("Missing Fields", "Please fill all required fields.");
      return;
    }

    try {

      const res = await fetch(API,{
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body:JSON.stringify({
          type:"createEvent",
          eventId:"E"+Date.now(),
          title,
          shortDesc,
          longDesc,
          outcome,
          deadline
        })
      });

      const data = await res.json();

      if(data.status === "success"){
        Alert.alert("Success", "Event Created Successfully ");

        // Clear form
        setTitle("");
        setShortDesc("");
        setLongDesc("");
        setOutcome("");
        setDeadline("");

      } else {
        Alert.alert("Error", "Something went wrong");
      }

    } catch(err){
      console.log(err);
      Alert.alert("Error", "Network Error");
    }
  }

 return (
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        colors={["#0f172a", "#111827", "#0b1120"]}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>

            <Text style={styles.heading}>Create Event</Text>

            <TextInput
              style={styles.input}
              placeholder="Event Title"
              placeholderTextColor="#9ca3af"
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              style={styles.input}
              placeholder="Short Description"
              placeholderTextColor="#9ca3af"
              value={shortDesc}
              onChangeText={setShortDesc}
            />

            <TextInput
              style={[styles.input, styles.multiline]}
              placeholder="Long Description"
              placeholderTextColor="#9ca3af"
              value={longDesc}
              onChangeText={setLongDesc}
              multiline
            />

            <TextInput
              style={[styles.input, styles.multiline]}
              placeholder="Expected Outcome"
              placeholderTextColor="#9ca3af"
              value={outcome}
              onChangeText={setOutcome}
              multiline
            />

            <TextInput
              style={styles.input}
              placeholder="Deadline (YYYY-MM-DD)"
              placeholderTextColor="#9ca3af"
              value={deadline}
              onChangeText={setDeadline}
            />

            <TouchableOpacity activeOpacity={0.85} onPress={createEvent}>
              <LinearGradient
                colors={["#3b82f6", "#6366f1"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Create Event</Text>
              </LinearGradient>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  heading: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 25,
    textAlign: "center",
    color: "#ffffff",
    letterSpacing: 0.5,
  },

  input: {
    backgroundColor: "rgba(255,255,255,0.08)",
    padding: 16,
    borderRadius: 16,
    marginBottom: 18,
    fontSize: 14,
    color: "#ffffff",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  multiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },

  button: {
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

});