import React, { useState, useEffect } from "react";
import { Text, View, ScrollView } from "react-native";
import { useStyles } from "@/constants/Styles";
import { Video } from "expo-av";
// import { useNotification } from '../../hooks/useNotification';

import * as api from "@/lib/api";

type Notification = {
  activity: string;
  // details: string | null;
  // imageUrl: string | null;
  date: string;
  time: string;
};

export default function Index() {
  // useNotification();
  const styles = useStyles();
  const [notifications, setNotifications] = useState<Notification[]>([
    /*
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
    */
  ]);

  function formatDateTimeToYYDDMM(dateString: string): { date: string; time: string } {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      console.error("Invalid date string:", dateString);
      return { date: "Invalid Date", time: "Invalid Time" };
    }
  
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero to day
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, add leading zero
  
    const hours24 = date.getHours(); // 24-hour format
    const minutes = String(date.getMinutes()).padStart(2, "0"); // Add leading zero to minutes
  
    // Convert to 12-hour format and determine AM/PM
    const hours12 = hours24 % 12 || 12; // Convert 0 (midnight) to 12
    const period = hours24 >= 12 ? "PM" : "AM";
  
    // Format the time as hh:mm AM/PM
    const time = `${String(hours12).padStart(2, "0")}:${minutes} ${period}`;
  
    // Combine date and time
    return {
      date: `${year}-${month}-${day}`,
      time,
    };
  }

  useEffect(() => {
    // Periodically load notifications every second
    const intervalId = setInterval(async () => {
      try {
        const rawActivities = await api.getActivities();
        
        const formattedActivities = rawActivities.map((activity: any) => {
          const { date, time } = formatDateTimeToYYDDMM(activity.time);
          return {
            activity: activity.activity,
            date,
            time,
          };
        });
    
        setNotifications(formattedActivities);
      } catch (error) {
        console.error("Error loading activities:", error);
      }
    }, 1000);    

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  return (
    <View style={styles.view}>
      <Text style={[styles.title, { paddingTop: "25%" }]}>DOORSENSE</Text>
      <Text style={[styles.header, { marginTop: "0%" }]}>LIVE</Text>

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
        <Text style={[styles.logHeader, { right: "-35%" }]}>Date</Text>
      </View>
      <ScrollView style={styles.activityLog}>
        {notifications.map((notification, index) => (
          <View key={index} style={styles.notificationContainer}>
            <Text style={styles.notificationTitle}>
              {notification.activity}
            </Text>
            <Text style={styles.notificationDetails}>
              {notification.date} {notification.time}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
