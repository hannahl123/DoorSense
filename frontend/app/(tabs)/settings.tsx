import React, { useState, useEffect } from "react";
import { Pressable, Text, View, Switch, TouchableOpacity } from "react-native";
import { useTextStyles } from "@/constants/textStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { useExpoRouter } from "expo-router/build/global-state/router-store";

import { Colors } from "../../constants/Colors";
import {
  getDarkMode,
  getPushNotifications,
  setDarkMode,
  setPushNotifications,
} from "@/lib/storage";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function Settings() {
  const styles = useTextStyles();
  const router = useExpoRouter();
  const handlePress = () => {
    console.log("Button pressed");
    router.push("/about");
  };

  const [isEnabled, setIsEnabled] = useState(false);

  // load push notifications state
  useEffect(() => {
    const loadPushNotifications = async () => {
      const on = await getPushNotifications();
      if (typeof on !== "undefined") setIsEnabled(on);
    };
    loadPushNotifications();
  }, []);

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
          trackColor={{
            false: Colors.light.background,
            true: Colors.light.text,
          }} // Customize colors
          thumbColor={isEnabled ? "#FFF" : "#fff"} // Customize thumb color
          ios_backgroundColor="#3e3e3e"
          onValueChange={async () => {
            setPushNotifications(!isEnabled);
            setIsEnabled((prevState) => !prevState);
          }}
          value={isEnabled}
          style={styles.toggle}
        />
      </View>
      <View style={styles.rect}>
        <Text style={styles.optionText}>DELETE ALL HISTORY</Text>
        <TouchableOpacity
          onPress={() => alert("Deleted all previous history.")}
        >
          <MaterialIcons name="delete" style={styles.settings_icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.rect}>
        <Text style={styles.optionText}>DARK MODE</Text>
        <TouchableOpacity
          onPress={async () => {
            await setDarkMode(!(await getDarkMode()));
            console.log(`dark mode: ${await getDarkMode()}`);
            alert("Coming later, be patient bruh");
          }}
        >
          <MaterialIcons name="contrast" style={styles.settings_icon} />
        </TouchableOpacity>
      </View>
      <Pressable onPress={handlePress}>
        <View style={styles.rect}>
          <Text style={styles.optionText}>ABOUT DOORSENSE</Text>
          <MaterialIcons name="info" style={styles.settings_icon} />
        </View>
      </Pressable>
    </View>
  );
}

