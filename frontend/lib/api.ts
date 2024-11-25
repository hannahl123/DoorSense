import axios from "axios";

const API_ENDPOINT = process.env.EXPO_PUBLIC_API_ENDPOINT;

export async function getActivities(limit?: number) {
  try {
    const params = limit ? { limit } : {};
    const response = await axios.get(`${API_ENDPOINT}/activities`, { params });
    console.log(`response.data: ${JSON.stringify(response.data)}`);
    return response.data;
  } catch (error) {
    console.error(`Error experienced when fetching activities:\n${error}`);
    return [];
  }
}

export async function getNotifications(
  important: boolean = true,
  weather: boolean = true,
  visitor: boolean = true,
  parcel: boolean = true,
  reminders: boolean = true,
  unread: boolean = true,
  start_date: Date = new Date("1970-01-01"),
  end_date: Date = new Date("9999-12-31")
) {
  try {
    const response = await axios.get(`${API_ENDPOINT}/notifications`, {
      params: {
        important: Number(important),
        weather: Number(weather),
        visitor: Number(visitor),
        parcel: Number(parcel),
        reminders: Number(reminders),
        unread: Number(unread),
        start_date: start_date,
        end_date: end_date,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error experienced when fetching notifications:\n${error}`);
    return [];
  }
}

export async function deleteNotification(id: number) {
  try {
    const response = await axios.delete(`${API_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error experienced when deleting notification:\n${error}`);
    return null;
  }
}
