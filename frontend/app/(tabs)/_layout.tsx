import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Colors } from "../../constants/Colors";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, 
        tabBarStyle: {
          height: '14%', 
          paddingTop: '3%', 
          paddingBottom: '3%',
          paddingHorizontal: '5%', 
          borderTopWidth: 1,
          borderColor: Colors.light.secondary,
        },
        tabBarLabelStyle: {
          marginTop: '10%',
          fontSize: 13, 
          fontWeight: 500,
        }, 
        tabBarActiveTintColor: Colors.light.secondary, 
        tabBarInactiveTintColor: Colors.light.primary, 
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
              size={30}
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
              size={30}
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
              size={30}
            />
          ),
        }}
      />
    </Tabs>
  );
}
