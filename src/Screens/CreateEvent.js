import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert
} from "react-native";
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

  return(
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.card}>

        <Text style={styles.heading}>Create Event</Text>

        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={styles.input}
          placeholder="Short Description"
          value={shortDesc}
          onChangeText={setShortDesc}
        />

        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Long Description"
          value={longDesc}
          onChangeText={setLongDesc}
          multiline
        />

        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Outcome"
          value={outcome}
          onChangeText={setOutcome}
          multiline
        />

        <TextInput
          style={styles.input}
          placeholder="Deadline (YYYY-MM-DD)"
          value={deadline}
          onChangeText={setDeadline}
        />

        <TouchableOpacity style={styles.button} onPress={createEvent}>
          <Text style={styles.buttonText}>Create Event</Text>
        </TouchableOpacity>

      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({

  container:{
    flexGrow:1,
    justifyContent:"center",
    padding:20,
    backgroundColor:"#f5f7fa"
  },

  card:{
    backgroundColor:"#fff",
    borderRadius:20,
    padding:20,
    elevation:6
  },

  heading:{
    fontSize:22,
    fontWeight:"bold",
    marginBottom:20,
    textAlign:"center"
  },

  input:{
    backgroundColor:"#f1f3f6",
    padding:14,
    borderRadius:12,
    marginBottom:15,
    fontSize:14
  },

  multiline:{
    minHeight:80,
    textAlignVertical:"top"
  },

  button:{
    backgroundColor:"#3b82f6",
    padding:16,
    borderRadius:14,
    alignItems:"center",
    marginTop:10
  },

  buttonText:{
    color:"#fff",
    fontSize:16,
    fontWeight:"bold"
  }

});