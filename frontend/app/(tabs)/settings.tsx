import React from "react";
import { Pressable, Text, View } from 'react-native';
import { useTextStyles } from "@/constants/textStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { useExpoRouter } from "expo-router/build/global-state/router-store";

export default function Settings() {
    const styles = useTextStyles();
    const router = useExpoRouter();
    const handlePress = () => {
        console.log('Button pressed');
        router.push('/about');
    }

    return (
        <View
            style={styles.view}
        >
            <Text style={styles.title}>SETTINGS</Text>
            <View style={[styles.rect, {
                marginTop: '35%',
            }]}>
                <Text style={styles.optionText}>PUSH NOTIFICATIONS</Text>
                <MaterialIcons
                    name="settings"
                    style={styles.settings_icon}
                />
            </View>
            <View style={styles.rect}>
                <Text style={styles.optionText}>DELETE ALL HISTORY</Text>
                <MaterialIcons
                    name="delete"
                    style={styles.settings_icon}
                />
            </View>
            <View style={styles.rect}>
                <Text style={styles.optionText}>DARK MODE</Text>
                <MaterialIcons
                    name="contrast"
                    style={styles.settings_icon}
                />
            </View>
            <Pressable onPress={handlePress}>
                <View style={styles.rect}>
                    <Text style={styles.optionText}>ABOUT DOORSENSE</Text>
                    <MaterialIcons
                        name="info"
                        style={styles.settings_icon}
                    />
                </View>
            </Pressable>


        </View>
    )
}