import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useStyles } from "@/constants/Styles";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function About() {
  const styles = useStyles();
  const router = useRouter();

  return (
    <View style={styles.view}>

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("/settings")} // Navigate back to the settings page
      >
        <MaterialIcons name="arrow-back" size={24} style={styles.back} />
        <Text style={styles.backText}>
          Back
        </Text>
      </TouchableOpacity>

      <Text style={styles.title}>About DoorSense</Text>
      <Text style={[styles.body, { marginBottom: "5%" }]}>
        DoorSense is a smart door assistant designed to transform any
        traditional door into a multifunctional smart system. Utilizing a
        Raspberry Pi 4B, it provides real-time notifications based on triggers
        like weather conditions, package deliveries, and visitor detection.
      </Text>
      <Text style={[styles.body, { marginVertical: "5%" }]}>
        DoorSense ensures you never miss a critical update. Imagine your door
        notifying you to grab an umbrella before it rains, suggesting the right
        clothing for a temperature drop, or alerting you when a package or
        visitor is detected.
      </Text>
      <Text style={[styles.body, { marginVertical: "5%" }]}>
        The integrated mobile app lets you manage notifications, monitor door
        activity, and stay connected to your smart door anytime, anywhere.
      </Text>
    </View>
  );
}
