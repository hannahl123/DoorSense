import { MaterialIcons } from "@expo/vector-icons";
import { Tabs, Stack } from "expo-router";
import { Colors } from "../constants/Colors";

export default function RootLayout() {
  return (
    <Stack
        screenOptions={{
            headerShown: false,
        }}
    >
        <Tabs.Screen 
            name="(tabs)"
            options={{
                headerShown: false,
                title: "Back",
            }}
        />

        <Tabs.Screen 
            name="about" 
            options={{
                title: " ",
                headerShown: true,
            }}
        />
    </Stack>
  );
}
