import React, { useState, useEffect } from "react";
import { Text, View, ScrollView } from "react-native";
import { Image } from "expo-image";
import { useStyles } from "@/constants/Styles";
import io from "socket.io-client";

import * as api from "@/lib/api";

type Notification = {
  activity: string;
  // details: string | null;
  // imageUrl: string | null;
  date: string;
  time: string;
};

export default function Index() {
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
  const [currentFrame, setCurrentFrame] = useState<string | null>(null);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    const loadNotifications = async () =>
      setNotifications(await api.getActivities());

    loadNotifications();
  }, []);

  useEffect(() => {
    // establish WebSocket connection
    const socket = io("http://10.20.104.1:8080", {
      transports: ["websocket"],
    });

    // listen for incoming video frames
    socket.on("video_stream", (data: string) => {
      if (pause) return;
      // console.log("Received video frame:", data);
      setCurrentFrame(`data:image/jpeg;base64,${data}`);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <View style={styles.view}>
      <Text style={[styles.title, { paddingTop: "25%" }]}>DOORSENSE</Text>
      <Text style={[styles.header, { marginTop: "0%" }]}>LIVE</Text>

      {/* <Pressable
        onPress={() => {
          console.log(`Pause: ${pause}`);
          setPause(!pause);
        }}
      > */}
      <Image
        source={{ uri: currentFrame }}
        style={styles.video}
        // key={currentFrame} // Add key to force re-render
        cachePolicy="memory-disk"
      />
      {/* </Pressable> */}

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
