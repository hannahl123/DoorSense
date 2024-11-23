import { StyleSheet } from "react-native";
import { Colors, getColors } from "./Colors";
import { useTheme } from "@/components/ThemeContext";

export const useStyles = () => {
  const {theme} = useTheme();
  const Colors = getColors(theme);

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
      color: Colors.primary,
      marginBottom: "10%",
    },
    header: {
      fontSize: 20,
      color: Colors.primary,
      marginVertical: "3%",
      alignSelf: "flex-start",
    },
    video: {
      width: "100%",
      height: "35%",
    },
    rect: {
      borderColor: Colors.secondary,
      borderWidth: 1.5,
      borderRadius: 8, 
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
      color: Colors.primary,
    },
    settings_icon: {
      color: Colors.primary,
      marginTop: -4,
      marginRight: "3%",
      fontSize: 25,
    },
    body: {
      color: Colors.primary,
      fontSize: 15,
    },
    toggle: {
      color: Colors.primary,
      transform: [{ scale: 0.6 }],
      marginVertical: "-2%",
      marginRight: "-2%",
    },
    warning: {
      paddingHorizontal: "1%",
      color: Colors.primary,
      fontSize: 18,
      fontWeight: "bold",
    },
    filtericon: {
      fontSize: 38,
      paddingLeft: "10%",
      color: Colors.primary,
    },
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: "#fff",
      marginTop: "30%",
      maxHeight: "75%",
      width: '110%', 
    },
    notification: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: Colors.secondary,
      paddingVertical: 12,
      width: "100%",
    },
    icons: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingRight: "3%",
    },
    dot: {
      width: 10,
      height: 10,
      backgroundColor: Colors.secondary,
      borderRadius: 5,
      marginRight: 15,
      marginTop: 4
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      width: "80%",
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: '5%',
      alignItems: "center",
      elevation: 5,
      height: '60%'
    },
    modalTitle: {
      color: Colors.primary,
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: '5%',
    },
    modalDetails: {
      color: Colors.primary,
      fontSize: 16,
      marginBottom: 8,
      textAlign: "center",
    },
    modalImage: {
      width: "100%", 
      height: '60%', 
      borderRadius: '4%', 
    }, 
    modalDate: {
      fontSize: 14,
      color: Colors.primary,
      marginTop: '6%',
      marginBottom: '3%'
    },
    modalActions: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
    modalButton: {
      flex: 1,
      padding: "3%",
      borderRadius: 8,
      marginHorizontal: 5,
      alignItems: "center",
      borderWidth: 1,
      borderColor: Colors.secondary,
      color: Colors.primary,
    },
    button: {
      borderWidth: 1,
      borderRadius: 8,
      borderColor: Colors.secondary,
      padding: "3%",
      marginHorizontal: "8%",
      marginVertical: "5%",
    },
    buttonText: {
      color: Colors.primary,
      fontSize: 16,
      fontWeight: "bold",
    },
    checkbox: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: '3%',
    },
    checkboxIcon: {
      fontSize: 24,
      color: Colors.primary,
      marginRight: 10,
    },
    checkboxLabel: {
      fontSize: 16,
      color: Colors.primary,
    },
    datePicker: {
      fontSize: 16,
      color: Colors.primary,
      marginVertical: 10,
    },
    activityLog: {
      marginTop: '3%',
      maxHeight: 200,
      width: '100%', 
      backgroundColor: '#FFF', 
      color: Colors.primary,
    }, 
    notificationContainer: {
      paddingHorizontal: '2%', 
      paddingTop: '0%', 
      paddingBottom: '3.5%', 
      marginVertical: '2%', 
      borderBottomWidth: 1, 
      borderBottomColor: Colors.secondary,
      flexDirection: 'row', 
      justifyContent: 'space-between',
    }, 
    notificationTitle: {
      fontSize: 13, 
      color: Colors.primary, 
    }, 
    notificationDetails: {
      fontSize: 12, 
      color: Colors.primary, 
    }, 
    activityHeader: {
      marginTop: '3%', 
      flexDirection: 'row', 
      borderBottomWidth: 1, 
      width: '100%', 
      borderBottomColor: Colors.secondary,
      paddingBottom: '3%', 
    }, 
    logHeader: {
      color: Colors.secondary, 
      fontSize: 15, 
      paddingHorizontal: '2%', 
    }, 
  });
};

export const switchStyles = {
  trackColor: {
    false: Colors.primary, 
    true: Colors.secondary, 
  }, 
  thumbColor: {
    on: "#FFF", // circle colour when on
    off: "#FFF" // circle colour when off
  }, 
  ios_backgroundColor: Colors.primary, 
}