import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { Colors } from "./Colors";
import {
  Montserrat_400Regular,
  Montserrat_700Bold,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";

export const useTextStyles = () => {
  return StyleSheet.create({
    view: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
      padding: "10%",
    },
    title: {
      fontSize: 30,
      fontWeight: "bold",
      color: Colors.light.text,
      marginBottom: "10%",
    },
    header: {
      fontSize: 18,
      fontWeight: "bold",
      color: Colors.light.text,
      marginBottom: "1%",
      alignSelf: "flex-start",
    },
    video: {
      width: "100%",
      height: 200,
    },
    rect: {
      borderColor: Colors.light.background,
      borderWidth: 1.5,
      width: "90%",
      paddingHorizontal: "7%",
      paddingVertical: "7%",
      marginVertical: "5%",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    optionText: {
      fontSize: 16,
      fontWeight: "semibold",
      color: Colors.light.text,
    },
    settings_icon: {
      color: Colors.light.text,
      marginTop: -4,
      marginRight: "3%",
      fontSize: 25,
    },
    body: {
      color: Colors.light.text,
      fontSize: 15,
    },
    toggle: {
      color: Colors.light.text,
      transform: [{ scale: 0.65 }],
      marginVertical: "-2%",
      marginRight: "-2%",
    },
    warning: {
      paddingHorizontal: "1%",
      color: Colors.light.text,
      fontSize: 18,
      fontWeight: "bold",
    },
    unread: {
      paddingHorizontal: "3%",
      fontSize: 20,
    },
    filtericon: {
      fontSize: 38,
      paddingLeft: "10%",
      color: Colors.light.text,
    },
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: "#fff",
      marginTop: '10%', 
      maxHeight: '75%', 
    },
    notification: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: Colors.light.background,
      paddingVertical: 12,
      width: '100%', 
    },
    icons: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingRight: '3%'
    },
    dot: {
      width: 10,
      height: 10,
      backgroundColor: Colors.light.background,
      borderRadius: 5,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: '80%',
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 16,
      alignItems: 'center',
      elevation: 5,
    },
    modalTitle: {
      color: Colors.light.text,
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    modalDetails: {
      color: Colors.light.text, 
      fontSize: 16,
      marginBottom: 8,
      textAlign: 'center',
    },
    modalDate: {
      fontSize: 14,
      color: Colors.light.text,
      marginBottom: 16,
    },
    modalActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    modalButton: {
      flex: 1,
      padding: '3%',
      borderRadius: 8,
      marginHorizontal: 5,
      alignItems: 'center',
      borderWidth: 1, 
      borderColor: Colors.light.background, 
      color: Colors.light.text, 
    },
    button: {
      borderWidth: 1,
      borderRadius: 8,
      borderColor: Colors.light.background, 
      padding: '3%', 
      marginHorizontal: '8%', 
      marginVertical: '5%', 
    },
    buttonText: {
      color: Colors.light.text,
      fontSize: 16,
      fontWeight: 'bold',
    },
    checkbox: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 10,
    },
    checkboxIcon: {
      fontSize: 24,
      color: Colors.light.text,
      marginRight: 10,
    },
    checkboxLabel: {
      fontSize: 16,
      color: Colors.light.text,
    },
    datePicker: {
      fontSize: 16,
      color: Colors.light.text,
      marginVertical: 10,
    },
  });
};
