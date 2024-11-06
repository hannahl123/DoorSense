import React from "react";
import {Text, View} from 'react-native';
import { useTextStyles } from "@/constants/textStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";

export default function Settings() {
    const styles = useTextStyles();

    return (
        <View 
            style={styles.view}
        >
            <Text style={styles.title}>SETTINGS</Text>
            <View style={styles.rect}>
                <Text style={styles.optionText}>PUSH NOTIFICATIONS</Text>
                <MaterialIcons 
                    name="home" 
                    style={styles.settings_icon}
                />
            </View>
            <View style={styles.rect}>
                <Text style={styles.optionText}>DELETE ALL HISTORY</Text>
                <MaterialIcons 
                    name="home" 
                    style={styles.settings_icon}
                />
            </View>
            <View style={styles.rect}>
                <Text style={styles.optionText}>DARK MODE</Text>
                <MaterialIcons 
                    name="home" 
                    style={styles.settings_icon}
                />
            </View>
            <View style={styles.rect}>
                <Text style={styles.optionText}>ABOUT DOORSENSE</Text>
                <MaterialIcons 
                    name="home" 
                    style={styles.settings_icon}
                />
            </View>

        </View>
    )
}