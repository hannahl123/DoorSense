import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useTheme } from "@/components/ThemeContext";

export default function TabsLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: "14%",
          paddingTop: "4%",
          paddingBottom: "3%",
          paddingHorizontal: "5%",
          borderTopWidth: 1,
          borderColor: colors.secondary,
          backgroundColor: colors.background,
        },
        tabBarLabelStyle: {
          marginTop: "10%",
          fontSize: 13,
          fontWeight: 500,
        },
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.primary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "HOME",
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name={"home"}
              color={focused ? colors.secondary : colors.primary}
              size={30}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="recent"
        options={{
          title: "RECENT",
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name={"schedule"}
              color={focused ? colors.secondary : colors.primary}
              size={30}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "SETTINGS",
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name={"settings"}
              color={focused ? colors.secondary : colors.primary}
              size={30}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="about" 
        options={{
          title: " ",
          headerShown: true,
        }}
      />
    </Tabs>
  );
}
