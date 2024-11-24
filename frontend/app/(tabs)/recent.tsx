import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, ScrollView, Modal, Image } from "react-native";
import { useStyles } from "@/constants/Styles";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Recent() {
  const styles = useStyles();

  type Notification = {
    title: string;
    details: string | null;
    imageUrl: string | null;
    date: string;
    hasExclamation: boolean;
    hasDot: boolean;
    isWeather: boolean;
  };

  const initialNotifications: Notification[] = [
    {
      title: "Intruder detected",
      details: null,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRewZsKrVeHBvxcN-xEFaQOoHfjc9Z-AsgIOw&s",
      date: "2024-11-21",
      hasExclamation: true,
      hasDot: true,
      isWeather: false,
    },
    {
      title: "Door opened",
      details: null,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRewZsKrVeHBvxcN-xEFaQOoHfjc9Z-AsgIOw&s",
      date: "2024-11-20",
      hasExclamation: true,
      hasDot: false,
      isWeather: false,
    },
    {
      title: "Parcel delivered at door",
      details: null,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRewZsKrVeHBvxcN-xEFaQOoHfjc9Z-AsgIOw&s",
      date: "2024-11-19",
      hasExclamation: false,
      hasDot: true,
      isWeather: false,
    },
    {
      title: "Rain starting soon",
      details: null,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRewZsKrVeHBvxcN-xEFaQOoHfjc9Z-AsgIOw&s",
      date: "2024-11-18",
      hasExclamation: false,
      hasDot: false,
      isWeather: true,
    },
    {
      title: "Rain starting soon",
      details: null,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRewZsKrVeHBvxcN-xEFaQOoHfjc9Z-AsgIOw&s",
      date: "2024-11-18",
      hasExclamation: false,
      hasDot: false,
      isWeather: true,
    },
    {
      title: "Rain starting soon",
      details: null,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRewZsKrVeHBvxcN-xEFaQOoHfjc9Z-AsgIOw&s",
      date: "2024-11-18",
      hasExclamation: false,
      hasDot: false,
      isWeather: true,
    },
    {
      title: "Rain starting soon",
      details: null,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRewZsKrVeHBvxcN-xEFaQOoHfjc9Z-AsgIOw&s",
      date: "2024-11-18",
      hasExclamation: false,
      hasDot: false,
      isWeather: true,
    },
    {
      title: "Rain starting soon",
      details: null,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRewZsKrVeHBvxcN-xEFaQOoHfjc9Z-AsgIOw&s",
      date: "2024-11-18",
      hasExclamation: false,
      hasDot: false,
      isWeather: true,
    },
    {
      title: "Rain starting soon",
      details: null,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRewZsKrVeHBvxcN-xEFaQOoHfjc9Z-AsgIOw&s",
      date: "2024-11-18",
      hasExclamation: false,
      hasDot: false,
      isWeather: true,
    },
    {
      title: "Rain starting soon",
      details: null,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRewZsKrVeHBvxcN-xEFaQOoHfjc9Z-AsgIOw&s",
      date: "2024-11-18",
      hasExclamation: false,
      hasDot: false,
      isWeather: true,
    },
    {
      title: "Rain starting soon",
      details: null,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRewZsKrVeHBvxcN-xEFaQOoHfjc9Z-AsgIOw&s",
      date: "2024-11-18",
      hasExclamation: false,
      hasDot: false,
      isWeather: true,
    },
  ];

  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Filters
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [importantFilter, setImportantFilter] = useState(false);
  const [unreadFilter, setUnreadFilter] = useState(false);
  const [weatherFilter, setWeatherFilter] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const openModal = (notification: Notification) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item === notification ? { ...item, hasDot: false } : item
      )
    );
    setSelectedNotification(notification);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedNotification(null);
    setModalVisible(false);
  };

  const deleteNotification = () => {
    if (selectedNotification) {
      setNotifications((prev) =>
        prev.filter(
          (notification) => notification.title !== selectedNotification.title
        )
      );
      closeModal();
    }
  };

  const applyFilters = () => {
    let filteredNotifications = initialNotifications;
    if (importantFilter && unreadFilter && weatherFilter) {
      filteredNotifications = filteredNotifications.filter(
        (notification) => notification.hasDot || notification.hasExclamation || notification.isWeather
      )
    } else if (importantFilter && unreadFilter) {
      filteredNotifications = filteredNotifications.filter(
        (notification) => notification.hasExclamation || notification.hasDot
      );
    } else if (weatherFilter && unreadFilter) {
      filteredNotifications = filteredNotifications.filter(
        (notification) => notification.isWeather || notification.hasDot
      );
    } else if (importantFilter && weatherFilter) {
      filteredNotifications = filteredNotifications.filter(
        (notification) => notification.hasExclamation || notification.isWeather
      )
    } else if (importantFilter) {
      // Filter important notifications
      filteredNotifications = filteredNotifications.filter(
        (notification) => notification.hasExclamation
      );
    } else if (unreadFilter) {
      // Filter unread notifications
      filteredNotifications = filteredNotifications.filter(
        (notification) => notification.hasDot
      );
    } else if (weatherFilter) {
      // Filter weather notifications
      filteredNotifications = filteredNotifications.filter(
        (notification) => notification.isWeather
      );
    }

    // Filter by date range
    if (startDate || endDate) {
      filteredNotifications = filteredNotifications.filter((notification) => {
        const notificationDate = new Date(notification.date).getTime();
        const start = startDate ? startDate.getTime() : -Infinity;
        const end = endDate ? endDate.getTime() : Infinity;
        return notificationDate >= start && notificationDate <= end;
      });
    }

    setNotifications(filteredNotifications);
    setFilterModalVisible(false);
  };

  return (
    <View style={styles.view}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          position: "absolute",
          top: "15%",
        }}
      >
        <Text style={styles.title}>RECENT</Text>
        <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
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
            <View style={{flexDirection: 'row'}}>
              {notification.hasDot && <View style={styles.dot} />}
              <Text style={styles.body}>{notification.title}</Text>
            </View>
        
            <View style={styles.icons}>
              {notification.hasExclamation && (
                <Text style={styles.warning}>!</Text>
              )}
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
                <Text style={styles.modalTitle}>
                  {selectedNotification.title}
                </Text>
                {selectedNotification.imageUrl ? (
                  <Image
                    source={{ uri: selectedNotification.imageUrl }}
                    style={styles.modalImage}
                  />
                ) : (
                  <Text style={styles.modalDetails}>
                    {selectedNotification.details}
                  </Text>
                )}
                <Text style={styles.modalDate}>
                  Date: {selectedNotification.date}
                </Text>
                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.button]}
                    onPress={() => {
                      deleteNotification();
                      alert("Notification deleted!");
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

      {/* Filter Modal */}
      <Modal
        visible={filterModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter</Text>
            <View>
              {/* Important */}
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => setImportantFilter(!importantFilter)}
              >
                <MaterialIcons
                  name={
                    importantFilter ? "check-box" : "check-box-outline-blank"
                  }
                  style={styles.checkboxIcon}
                />
                <Text style={styles.checkboxLabel}>Important</Text>
              </TouchableOpacity>

              {/* Unread filter */}
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => setUnreadFilter(!unreadFilter)}
              >
                <MaterialIcons
                  name={unreadFilter ? "check-box" : "check-box-outline-blank"}
                  style={styles.checkboxIcon}
                />
                <Text style={styles.checkboxLabel}>Unread</Text>
              </TouchableOpacity>

              {/* Weather Filter */}
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => setWeatherFilter(!weatherFilter)}
              >
                <MaterialIcons
                  name={weatherFilter ? "check-box" : "check-box-outline-blank"}
                  style={styles.checkboxIcon}
                />
                <Text style={styles.checkboxLabel}>Weather</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => setShowStartPicker(true)}>
              <Text style={styles.datePicker}>
                From: {startDate ? startDate.toDateString() : "Select a date"}
              </Text>
            </TouchableOpacity>
            {showStartPicker && (
              <DateTimePicker
                value={startDate || new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowStartPicker(false);
                  if (selectedDate) setStartDate(selectedDate);
                }}
              />
            )}

            <TouchableOpacity onPress={() => setShowEndPicker(true)}>
              <Text style={styles.datePicker}>
                To: {endDate ? endDate.toDateString() : "Select a date"}
              </Text>
            </TouchableOpacity>
            {showEndPicker && (
              <DateTimePicker
                value={endDate || new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowEndPicker(false);
                  if (selectedDate) setEndDate(selectedDate);
                }}
              />
            )}
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity style={styles.button} onPress={applyFilters}>
                <Text style={styles.buttonText}>Apply Filters</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setFilterModalVisible(false)}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
