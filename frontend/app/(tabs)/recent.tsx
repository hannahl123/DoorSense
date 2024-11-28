import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
} from "react-native";
import { useStyles } from "@/constants/Styles";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as api from "@/lib/api";

export default function Recent() {
  const styles = useStyles();

  type Notification = {
    id: number;
    title: string;
    imageUrl: string | null;
    date: string;
    important: boolean;
    unread: boolean;
    isWeather: boolean;
    parcel: boolean; 
  };

  const initialNotifications: Notification[] = [
    /*
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
    */
  ];

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

    // Filters
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [importantFilter, setImportantFilter] = useState(false);
    const [unreadFilter, setUnreadFilter] = useState(false);
    const [parcelFilter, setParcelFilter] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);

    const [activeFilters, setActiveFilters] = useState({});

  // Fetch notifications
  const fetchNotifications = async (filters = activeFilters) => {
    try {
      const data = await api.getNotifications(filters);
  
      // Convert important and other integer fields to boolean
      const formattedData = data.map((item: Notification) => ({
        ...item,
        important: Boolean(item.important),
        unread: Boolean(item.unread),
        parcel: Boolean(item.parcel),
      }));
  
      // console.log("Formatted notifications:", formattedData);
      setNotifications(formattedData);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };
  

  useEffect(() => {
    fetchNotifications();
  
    const intervalId = setInterval(() => {
      fetchNotifications();
    }, 1000);
  
    return () => clearInterval(intervalId);
  }, [activeFilters]);

  const openModal = (notification: Notification) => {
    toggleUnread(notification.id);
    setNotifications((prev) =>
      prev.map((item) =>
        item === notification ? { ...item, unread: false } : item
      )
    );
    setSelectedNotification(notification);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedNotification(null);
    setModalVisible(false);
  };

  const deleteNotification = async () => {
    if (selectedNotification) {
      try {
        console.log(selectedNotification.id);
        await api.deleteNotification(selectedNotification.id);
        fetchNotifications();
        closeModal();
        alert("Notification deleted!");
      } catch (error) {
        console.error("Error deleting notification:", error);
        alert("Failed to delete notification.");
      }
    }
  };

  const toggleUnread = async (id: number) => {
    try {
        const message = await api.toggleUnreadNotification(id);
        console.log(message);

        // Update the notifications state
        setNotifications((prevNotifications) =>
            prevNotifications.map((notification) =>
                notification.id === id
                    ? { ...notification, unread: !notification.unread }
                    : notification
            )
        );
    } catch (error: any) {
        console.error("Error toggling unread status:", error.message);
        alert(`Failed to toggle unread status: ${error.message}`);
    }
};

  // const applyFilters = () => {
  //   let filteredNotifications = initialNotifications;
  //   if (importantFilter && unreadFilter && weatherFilter) {
  //     filteredNotifications = filteredNotifications.filter(
  //       (notification) =>
  //         notification.unread ||
  //         notification.important ||
  //         notification.isWeather
  //     );
  //   } else if (importantFilter && unreadFilter) {
  //     filteredNotifications = filteredNotifications.filter(
  //       (notification) => notification.important || notification.unread
  //     );
  //   } else if (weatherFilter && unreadFilter) {
  //     filteredNotifications = filteredNotifications.filter(
  //       (notification) => notification.isWeather || notification.unread
  //     );
  //   } else if (importantFilter && weatherFilter) {
  //     filteredNotifications = filteredNotifications.filter(
  //       (notification) => notification.important || notification.isWeather
  //     );
  //   } else if (importantFilter) {
  //     // Filter important notifications
  //     filteredNotifications = filteredNotifications.filter(
  //       (notification) => notification.important
  //     );
  //   } else if (unreadFilter) {
  //     // Filter unread notifications
  //     filteredNotifications = filteredNotifications.filter(
  //       (notification) => notification.unread
  //     );
  //   } else if (weatherFilter) {
  //     // Filter weather notifications
  //     filteredNotifications = filteredNotifications.filter(
  //       (notification) => notification.isWeather
  //     );
  //   }

  //   // Filter by date range
  //   if (startDate || endDate) {
  //     filteredNotifications = filteredNotifications.filter((notification) => {
  //       const notificationDate = new Date(notification.date).getTime();
  //       const start = startDate ? startDate.getTime() : -Infinity;
  //       const end = endDate ? endDate.getTime() : Infinity;
  //       return notificationDate >= start && notificationDate <= end;
  //     });
  //   }

  //   setNotifications(filteredNotifications);
  //   setFilterModalVisible(false);
  // };

  const applyFilters = () => {
    const filters: any = {};
    if (importantFilter) filters.important = 1;
    if (unreadFilter) filters.unread = 1;
    if (parcelFilter) filters.parcel = 1;
    if (startDate) filters.start_date = startDate;
    if (endDate) filters.end_date = endDate;
  
    // console.log("Applying filters:", filters);
    setActiveFilters(filters); // Save the filters to state
    fetchNotifications(filters); // Fetch notifications using the new filters
    setFilterModalVisible(false); // Close the filter modal
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
            <View style={{ flexDirection: "row" }}>
              {notification.unread && <View style={styles.dot} />}
              <Text style={styles.body}>{notification.title}</Text>
            </View>

            <View style={styles.icons}>
              {notification.important && <Text style={styles.warning}>!</Text>}
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
                    {selectedNotification.title}
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
                onPress={() => setParcelFilter(!parcelFilter)}
              >
                <MaterialIcons
                  name={parcelFilter ? "check-box" : "check-box-outline-blank"}
                  style={styles.checkboxIcon}
                />
                <Text style={styles.checkboxLabel}>Parcel</Text>
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
