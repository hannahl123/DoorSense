import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { useTextStyles } from "@/constants/textStyles";
import { MaterialIcons } from "@expo/vector-icons";

export default function Recent() {
    const styles = useTextStyles();

    return (
        <View
            style={styles.view}
        >
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', top: '-35%'}}>
                <Text style={styles.title}>RECENT</Text>
                <TouchableOpacity onPress={() => alert('Filter...')}>
                    <MaterialIcons
                        name="sort" 
                        style={styles.filtericon}
                    />
                </TouchableOpacity>
            </View>
            

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.body}>Notification Title</Text>
                <Text style={styles.warning}>!</Text>
                <Image 
                    style={styles.unread}
                    source={{
                        uri: 'assets/images/unread.png',
                    }}
                />
            </View>

        </View>
    );
}