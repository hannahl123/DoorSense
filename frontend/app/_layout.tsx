import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Colors } from "../constants/Colors";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, 
        tabBarStyle: {
          height: '12%', 
          paddingTop: '3%', 
          marginBottom: '3%',
          marginHorizontal: '5%', 
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          paddingTop: '3%',
          fontSize: 13, 
          fontWeight: 500,
        }, 
        tabBarIconStyle: {
          paddingBottom: '3%',
        },
        tabBarActiveTintColor: Colors.light.background, 
        tabBarInactiveTintColor: Colors.light.text, 
      }}
    >
      <Tabs.Screen
        name="index" 
        options={{
          title: 'HOME',
          tabBarIcon: ({focused}) => (
            <MaterialIcons 
              name={'home'} 
              color={focused ? '#52B69A' : '#1E6091'} 
              size={35}
            />
          ), 
        }}
      />
      <Tabs.Screen
        name="recent" 
        options={{
          title: 'RECENT',
          tabBarIcon: ({focused}) => (
            <MaterialIcons 
              name={'schedule'} 
              color={focused ? '#52B69A' : '#1E6091'} 
              size={35}
            />
          )
        }}
      />
      <Tabs.Screen
        name="settings" 
        options={{
          title: "SETTINGS", 
          tabBarIcon: ({focused}) => (
            <MaterialIcons 
              name={'settings'} 
              color={focused ? '#52B69A' : '#1E6091'} 
              size={35}
            />
          ),
        }}
      />
    </Tabs>
  );
}
