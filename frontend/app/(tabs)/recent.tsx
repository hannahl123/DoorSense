import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Button,
} from "react-native";
import { useTextStyles } from "@/constants/textStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

export default function Recent() {
  const styles = useTextStyles();

  type Notification = {
    title: string;
    details: string;
    date: string;
    hasExclamation: boolean;
    hasDot: boolean;
  };

  const notifications: Notification[] = [
    {
      title: "Notification 1",
      details: "This is the first notification.",
      date: "2024-11-21",
      hasExclamation: true,
      hasDot: true,
    },
    {
      title: "Notification 2",
      details: "This is the second notification.",
      date: "2024-11-20",
      hasExclamation: true,
      hasDot: false,
    },
    {
      title: "Notification 3",
      details: "This is the third notification.",
      date: "2024-11-19",
      hasExclamation: false,
      hasDot: true,
    },
    {
      title: "Notification 4",
      details: "This is the fourth notification.",
      date: "2024-11-18",
      hasExclamation: false,
      hasDot: false,
    },
  ];

  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (notification: Notification) => {
    setSelectedNotification(notification);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedNotification(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.view}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          position: "absolute",
          top: "10%",
        }}
      >
        <Text style={styles.title}>RECENT</Text>
        <TouchableOpacity onPress={() => alert("Filter...")}>
          <MaterialIcons name="sort" style={styles.filtericon} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        {notifications.map((notification, index) => (
          <TouchableOpacity
            key={index}
            style={styles.notification}
            onPress={() => openModal(notification)}
          >
            <Text style={styles.body}>{notification.title}</Text>
            <View style={styles.icons}>
              {notification.hasExclamation && (
                <Text style={styles.warning}>!</Text>
              )}
              {notification.hasDot && <View style={styles.dot} />}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedNotification && (
              <>
                <Text style={styles.modalTitle}>{selectedNotification.title}</Text>
                <Text style={styles.modalDetails}>{selectedNotification.details}</Text>
                <Text style={styles.modalDate}>Date: {selectedNotification.date}</Text>
                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.button]}
                    onPress={() => {
                      alert('Notification deleted!');
                      closeModal();
                    }}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.button]}
                    onPress={closeModal}
                  >
                    <Text style={styles.buttonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
