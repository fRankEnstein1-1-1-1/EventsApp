import React,{useEffect,useState} from "react"
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator
} from "react-native"
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

      // Sort by deadline 
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

  return(

    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.heading}>My Registered Events</Text>

      {events.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>
            You haven't registered for any events yet.
          </Text>
        </View>
      ) : (

        events.map((event,index)=>(

          <View key={index} style={styles.card}>

            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.desc}>{event.shortDesc}</Text>

            <Text style={styles.meta}>
              Deadline: {event.deadline}
            </Text>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                Registered ✓
              </Text>
            </View>

          </View>

        ))

      )}

    </ScrollView>

  )

}

const styles = StyleSheet.create({

  container:{
    padding:16,
    backgroundColor:"#f4f6fa",
    flexGrow:1
  },

  heading:{
    fontSize:22,
    fontWeight:"bold",
    marginBottom:16
  },

  card:{
    backgroundColor:"#fff",
    padding:16,
    borderRadius:16,
    marginBottom:16,
    elevation:4
  },

  title:{
    fontSize:18,
    fontWeight:"bold",
    marginBottom:6
  },

  desc:{
    fontSize:14,
    color:"#555",
    marginBottom:6
  },

  meta:{
    fontSize:13,
    color:"#777"
  },

  badge:{
    marginTop:10,
    alignSelf:"flex-start",
    backgroundColor:"#d1fae5",
    paddingHorizontal:10,
    paddingVertical:4,
    borderRadius:20
  },

  badgeText:{
    color:"#065f46",
    fontWeight:"600",
    fontSize:12
  },

  center:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },

  emptyText:{
    color:"#777",
    fontSize:15,
    textAlign:"center"
  }

})