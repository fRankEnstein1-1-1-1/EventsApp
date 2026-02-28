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
import BASE_URL from "../Api/Api";

const API = BASE_URL;

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function StudentHome(){

  const [events,setEvents] = useState([])
  const [active,setActive] = useState(null)
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    fetchEvents()
  },[])

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

  const registerEvent = async (eventId)=>{

    try{
      await fetch(API,{
        method:"POST",
        headers:{ "Content-Type":"application/json"},
        body:JSON.stringify({
          type:"registerEvent",
          eventId,
          email:"student@email.com"
        })
      })

      Alert.alert("Success","Registered Successfully ")
      fetchEvents()

    }catch(err){
      Alert.alert("Error","Something went wrong")
    }

  }

  const handlePress = (index)=>{
    LayoutAnimation.easeInEaseOut()
    setActive(active === index ? null : index)
  }

  if(loading){
    return(
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={{marginTop:10}}>Loading events...</Text>
      </View>
    )
  }

  return(
    <ScrollView contentContainerStyle={styles.container}>

      {events.map((event,index)=>{

        const expanded = active === index

        return(
          <TouchableOpacity
            key={index}
            activeOpacity={0.9}
            onPress={()=>handlePress(index)}
          >
            <View style={[styles.card, expanded && styles.activeCard]}>

              <Text style={styles.title}>{event.title}</Text>

              {!expanded && (
                <>
                  <Text style={styles.short}>{event.shortDesc}</Text>
                  <Text style={styles.meta}>
                    Deadline: {event.deadline}
                  </Text>
                </>
              )}

              {expanded && (
                <View style={styles.expandedSection}>
                  <Text style={styles.long}>{event.longDesc}</Text>
                  <Text style={styles.outcome}>{event.outcome}</Text>
                  <Text style={styles.meta}>
                    Deadline: {event.deadline}
                  </Text>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={()=>registerEvent(event.eventId)}
                  >
                    <Text style={styles.buttonText}>Register</Text>
                  </TouchableOpacity>

                </View>
              )}

            </View>
          </TouchableOpacity>
        )
      })}

    </ScrollView>
  )
}

const styles = StyleSheet.create({

  container:{
    padding:16,
    backgroundColor:"#f4f6fa"
  },

  loader:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },

  card:{
    backgroundColor:"#fff",
    borderRadius:18,
    padding:16,
    marginBottom:16,
    elevation:4
  },

  activeCard:{
    transform:[{ scale:1.04 }],
    elevation:10
  },

  title:{
    fontSize:18,
    fontWeight:"bold",
    marginBottom:6
  },

  short:{
    fontSize:14,
    color:"#555"
  },

  long:{
    fontSize:14,
    marginVertical:8
  },

  outcome:{
    fontStyle:"italic",
    marginBottom:6,
    color:"#444"
  },

  meta:{
    fontSize:13,
    color:"#777",
    marginTop:4
  },

  expandedSection:{
    marginTop:10
  },

  button:{
    marginTop:12,
    backgroundColor:"#3b82f6",
    padding:12,
    borderRadius:12,
    alignItems:"center"
  },

  buttonText:{
    color:"#fff",
    fontWeight:"bold"
  }

});