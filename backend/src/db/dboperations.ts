import mariadb from 'mariadb';
import config from './dbconfig';
import {Notification} from '../models/Notifications';
import {Activity} from '../models/Activity';

const pool = mariadb.createPool(config);

export async function GetNotificationsbyCategories(
    important: number,
    weather: number,
    visitor: number,
    parcel: number,
    reminders: number,
    unread: number,
    start_date: string,
    end_date: string
): Promise<Notification[]> {
    try {
        const results = await pool.query(
            `
            SELECT * 
            FROM notifications 
            WHERE (important = ? OR weather = ? OR visitor = ? OR parcel = ? OR reminders = ? OR unread = ?)
            AND date >= ? AND date <= ?`,
            [important, weather, visitor, parcel, reminders, unread, start_date, end_date]
        );
        return results.map(
            (result: any) =>
                new Notification(
                    result.id,
                    result.title,
                    result.important,
                    result.weather,
                    result.visitor,
                    result.parcel,
                    result.reminders,
                    result.unread,
                    result.date
                )
        );
    } catch (err) {
        console.error("Database query error:", err);
        throw err;
    }
}

export async function GetRecentActivity(limit: number): Promise<Activity[]> {
    try {
        const results = await pool.query(
            `
            SELECT * 
            FROM activity_log 
            ORDER BY time DESC 
            LIMIT ?`,
            [limit]
        );
        return results.map(
            (result: any) =>
                new Activity(result.id, result.activity, result.time)
        );
    } catch (err) {
        console.error("Database query error:", err);
        throw err;
    }
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
    try {
        const result = await pool.query(
            `
            INSERT INTO notifications (title, important, weather, visitor, parcel, reminders, unread, date) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [title, important, weather, visitor, parcel, reminders, unread, date]
        );
        const insertId = Number(result.insertId);
        console.log("Notification added with ID:", insertId);
        return insertId;
    } catch (err) {
        console.error("Database query error:", err);
        throw err;
    }
}

export async function AddActivity(activity: string, time: string): Promise<number> {
    try {
        const result = await pool.query(
            `
            INSERT INTO activity_log (activity, time) 
            VALUES (?, ?)`,
            [activity, time]
        );
        const insertId = Number(result.insertId);
        console.log("Activity added with ID:", insertId);
        return insertId;
    } catch (err) {
        console.error("Database query error:", err);
        throw err;
    }
}

export async function deleteAllNotifications(): Promise<number>{
    try {
        const result = await pool.query(
            `
            DELETE FROM notifications
            `
        );
        console.log(`${result.affectedRows} notifications deleted.`);
        return result.affectedRows;
    } catch (err) {
        console.error("Database query error:", err);
        throw err;
    }
}

export async function DeleteNotificationById(id: number): Promise<boolean> {
    try {
        const result = await pool.query(
            `
            DELETE FROM notifications WHERE id = ?
            `,
            [id]
        );
        console.log(`Notification with ID ${id} deleted.`);
        return result.affectedRows > 0;
    } catch (err) {
        console.error("Database query error:", err);
        throw err;
    }
}