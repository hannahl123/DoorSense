import React from 'react';
import { Text, View } from "react-native";
import { useTextStyles } from "@/constants/textStyles";
import { Video } from 'expo-av'

export default function Index() {
  const styles = useTextStyles();

  return (
    <View
      style={styles.view}
    >
      <Text style={styles.title}>DOORSENSE</Text>
      <Text style={styles.header}>LIVE</Text>

      {/* <Video 
        source={{uri: "https://www.w3schools.com/html/mov_bbb.mp4"}} 
        style={styles.video} 
        useNativeControls 
        isLooping
        onError={(e) => console.log('Error loading video:', e)}
      /> */}

    </View>
  );
}
