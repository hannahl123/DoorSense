import React, { useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { useStyles } from "@/constants/Styles";
import { Video } from "expo-av";

type Notification = {
  title: string;
  // details: string | null;
  // imageUrl: string | null;
  date: string;
  time: string;
};

export default function Index() {
  const styles = useStyles();

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      title: "Intruder detected",
      date: "2024-11-22",
      time: "10:30 AM",
    },
    {
      title: "Door opened",
      date: "2024-11-21",
      time: "09:00 PM",
    },
    {
      title: "Parcel delivered at door",
      date: "2024-11-21",
      time: "05:15 PM",
    },
    {
      title: "Rain starting soon",
      date: "2024-11-20", 
      time: "08: 20 AM"
    }
  ]);

  return (
    <View style={styles.view}>
      <Text style={[styles.title, {paddingTop: '25%'}]}>DOORSENSE</Text>
      <Text style={[styles.header, {marginTop: '0%'}]}>LIVE</Text>

      <Video
        source={{ uri: "https://www.w3schools.com/html/mov_bbb.mp4" }}
        style={styles.video}
        useNativeControls
        isLooping
        onError={(e) => console.log("Error loading video:", e)}
      />

      {/* Event Log */}
      <Text style={[styles.header, { marginTop: "10%" }]}>ACTIVITY LOG</Text>
      <View style={styles.activityHeader}>
        <Text style={styles.logHeader}>Activity</Text>
        <Text style={[styles.logHeader, {right: '-35%'}]}>Date</Text>
      </View>
      <ScrollView style={styles.activityLog}>
        {notifications.map((notification, index) => (
          <View key={index} style={styles.notificationContainer}>
            <Text style={styles.notificationTitle}>{notification.title}</Text>
            <Text style={styles.notificationDetails}>
              {notification.date} {notification.time}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
