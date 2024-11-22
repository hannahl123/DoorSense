import AsyncStorage from "@react-native-async-storage/async-storage";

export const setPushNotifications = async (on: boolean) => {
  try {
    await AsyncStorage.setItem("push-notifications", on ? "true" : "false");
  } catch (error) {
    console.error(`Error setting push notifications: ${error}`);
  }
};

export const getPushNotifications = async () => {
  try {
    const on = await AsyncStorage.getItem("push-notifications");
    if (on === null || on === "true") return true;
    return false;
  } catch (error) {
    console.error(`Error getting push notifications: ${error}`);
  }
};

export const setDarkMode = async (on: boolean) => {
  try {
    await AsyncStorage.setItem("dark-mode", on ? "true" : "false");
  } catch (error) {
    console.error(`Error setting dark mode: ${error}`);
  }
};

export const getDarkMode = async (on: boolean) => {
  try {
    const on = await AsyncStorage.getItem("dark-mode");
    if (on === null || on === "true") return true;
    return false;
  } catch (error) {
    console.error(`Error getting dark mode: ${error}`);
  }
};
