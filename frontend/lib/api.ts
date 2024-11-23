import axios from "axios";

import { API_ENDPOINT } from "@env";

export async function getActivities(limit?: number) {
  try {
    const response = await axios.get(
      `${API_ENDPOINT}/activities`,
      limit
        ? {
            params: {
              limit: limit,
            },
          }
        : {}
    );
    return response.data;
  } catch (error) {
    console.error(`Error experienced when fetching activities:\n${error}`);
    return [];
  }
}

export async function getNotifications(
  important?: boolean,
  parcel?: boolean,
  start_date?: Date,
  end_date?: Date
) {
  try {
    const response = await axios.get(`${API_ENDPOINT}/notifications`, {
      params: {
        important: important,
        parcel: parcel,
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
