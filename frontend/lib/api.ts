import axios from "axios";

const URI = "http://localhost:3000";

export async function getActivities(limit: number) {
  try {
    const response = await axios.get("/activities", {
      params: {
        limit: limit,
      },
    });
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
    const response = await axios.get("/notifications", {
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
