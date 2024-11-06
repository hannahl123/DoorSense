import React from "react";
import { Text, View } from "react-native";
import { useTextStyles } from "@/constants/textStyles";

export default function Recent() {
    const styles = useTextStyles();

    return (
        <View
            style={styles.view}
        >
            <Text style={styles.title}>RECENT</Text>
            <Text style={styles.header}>Filter</Text>

        </View>
    );
}