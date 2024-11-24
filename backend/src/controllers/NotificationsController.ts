import * as db from '../db/dboperations';
import { Notification } from '../models/Notifications';

export async function GetNotificationsByCategories(
    important: number,
    weather: number,
    visitor: number,
    parcel: number,
    reminders: number,
    unread: number,
    start_date: string,
    end_date: string
): Promise<Notification[]> {
    return await db.GetNotificationsbyCategories(
        important,
        weather,
        visitor,
        parcel,
        reminders,
        unread,
        start_date,
        end_date
    );
}

export async function AddNotification(
    title: string,
    important: number,
    weather: number,
    visitor: number,
    parcel: number,
    reminders: number,
    unread: number,
    date: string
): Promise<number> {
    return await db.AddNotification(title, important, weather, visitor, parcel, reminders, unread, date);
}

export async function DeleteAllNotifications(): Promise<number> {
    return await db.deleteAllNotifications();
}

export async function deleteNotificationById(id: number): Promise<boolean> {
    return await db.DeleteNotificationById(id);
}