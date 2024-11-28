import React, { useState, useEffect } from "react";
import { Pressable, Text, View, Switch, TouchableOpacity } from "react-native";
import { switchStyles, useStyles } from "@/constants/Styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useExpoRouter } from "expo-router/build/global-state/router-store";
import {
  getDarkMode,
  getPushNotifications,
  setDarkMode,
  setPushNotifications,
} from "@/lib/storage";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { useTheme } from "@/components/ThemeContext";

import * as api from "@/lib/api";

export default function Settings() {
  const [message, setMessage] = useState('');
  const styles = useStyles();
  const router = useExpoRouter();
  const { toggleTheme } = useTheme();
  const [isEnabled, setIsEnabled] = useState(false);

  // load push notifications state
  useEffect(() => {
    const loadPushNotifications = async () => {
      const on = await getPushNotifications();
      if (typeof on !== "undefined") setIsEnabled(on);
    };
    loadPushNotifications();
  }, []);

  const handleDelete = async () => {
    try {
        const result = await api.deleteAllNotifications();
        setMessage(result); // Update the message state with API response
    } catch (error) {
        setMessage('Failed to delete notifications.');
    }
};

  return (
    <View style={styles.view}>
      <Text style={styles.title}>SETTINGS</Text>
      <View
        style={[
          styles.rect,
          { flexDirection: "row", justifyContent: "space-between" },
        ]}
      >
        <Text style={styles.optionText}>PUSH NOTIFICATIONS</Text>
        <Switch
          trackColor={switchStyles.trackColor}
          thumbColor={
            isEnabled ? switchStyles.thumbColor.on : switchStyles.thumbColor.off
          }
          ios_backgroundColor={switchStyles.ios_backgroundColor}
          onValueChange={async () => {
            setPushNotifications(!isEnabled);
            setIsEnabled((prevState) => !prevState);
          }}
          value={isEnabled}
          style={styles.toggle}
        />
      </View>
      <TouchableOpacity
          onPress={() => {
            handleDelete();
            alert("Deleted all previous history.");
          }}
        >
      <View style={styles.rect}>
        <Text style={styles.optionText}>DELETE ALL HISTORY</Text>
        
          <MaterialIcons name="delete" style={styles.settings_icon} />
      </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          toggleTheme();
          await setDarkMode(!(await getDarkMode()));
          console.log(`dark mode: ${await getDarkMode()}`);
          //alert("Coming later, be patient bruh");
        }}
      >
        <View style={styles.rect}>
          <Text style={styles.optionText}>DARK MODE</Text>

          <MaterialIcons name="contrast" style={styles.settings_icon} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/about")}>
        <View style={styles.rect}>
          <Text style={styles.optionText}>ABOUT DOORSENSE</Text>
          <MaterialIcons name="info" style={styles.settings_icon} />
        </View>
      </TouchableOpacity>
    </View>
  );
}
