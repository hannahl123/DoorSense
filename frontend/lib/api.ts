import axios from "axios";

console.log(process.env.EXPO_PUBLIC_API_ENDPOINT);
const API_ENDPOINT = process.env.EXPO_PUBLIC_API_ENDPOINT;

function formatDateToYYYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export async function getActivities(limit?: number) {
  try {
    const params = limit ? { limit } : {};
    const response = await axios.get(`${API_ENDPOINT}/activities`, { params });
    // console.log(`response.data: ${JSON.stringify(response.data)}`);
    return response.data;
  } catch (error: any) {
    console.error(
      `Error experienced when fetching activities:\n`,
      error.response?.data || error.message
    );
    return [];
  }
}

export async function getNotifications(filters: Record<string, any> = {}) {
  try {
    const formattedFilters = { ...filters };

    if (filters.start_date instanceof Date) {
      formattedFilters.start_date = formatDateToYYYYMMDD(filters.start_date);
    }

    if (filters.end_date instanceof Date) {
      formattedFilters.end_date = formatDateToYYYYMMDD(filters.end_date);
    }

    // console.log("Formatted filters:", formattedFilters);

    const params = new URLSearchParams(formattedFilters).toString();
    const response = await axios.get(`${API_ENDPOINT}/notifications?${params}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching notifications:\n${error}`);
    return [];
  }
}

export async function deleteAllNotifications() {
  try {
    const response = await axios.delete(`${API_ENDPOINT}/notifications`);
    console.log(response.data.message);
    return response.data.message; // Return the message for UI updates
  } catch (error) {
    console.error("Error deleting notifications:", error);
    throw error;
  }
}

export async function deleteNotification(id: number) {
  try {
    console.log("id:", id);
    const response = await axios.delete(`${API_ENDPOINT}/notifications/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error experienced when deleting notification:\n${error}`);
    return null;
  }
}

export const toggleUnreadNotification = async (id: number): Promise<string> => {
  try {
    const response = await axios.patch(
      `${API_ENDPOINT}/notifications/${id}/mark-read`
    );
    return response.data.message; // Return the success message
  } catch (error: any) {
    if (error.response) {
      // Backend error responses
      throw new Error(
        error.response.data.error || "Failed to toggle unread status"
      );
    }
    throw new Error("Network error or server is unreachable");
  }
};
