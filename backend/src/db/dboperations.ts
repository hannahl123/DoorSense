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
            AND date >= ? AND date <= ?
            ORDER BY date DESC
            `,
            [important, weather, visitor, parcel, reminders, unread, start_date, end_date]
        );
        console.log(important)
        console.log(results);
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
                    result.date,
                    result.image
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
    date: string,
    image: Buffer | null
): Promise<number> {
    try {
        const result = await pool.query(
            `
            INSERT INTO notifications (title, important, weather, visitor, parcel, reminders, unread, date, image) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [title, important, weather, visitor, parcel, reminders, unread, date, image]
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

export async function GetNotificationsbyId(
    id: number,
): Promise<Notification[]> {
    try {
        const results = await pool.query(
            `
            SELECT * 
            FROM notifications 
            WHERE id = ?`,
            [id]
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
                    result.date,
                    result.image
                )
        );
    } catch (err) {
        console.error("Database query error:", err);
        throw err;
    }
}


export async function ToggleUnread(id: number): Promise<boolean> {
    try {
        const [notification] = await pool.query(
            `
            SELECT unread 
            FROM notifications 
            WHERE id = ?`,
            [id]
        );

        if (!notification) {
            console.error(`Notification with ID ${id} not found.`);
            throw new Error(`Notification with ID ${id} does not exist.`);
        }

        const newUnreadValue = notification.unread === 1 ? 0 : 1;

        const result = await pool.query(
            `
            UPDATE notifications 
            SET unread = ? 
            WHERE id = ?`,
            [newUnreadValue, id]
        );

        console.log(
            `Notification with ID ${id} unread property toggled to ${newUnreadValue}.`
        );
        return result.affectedRows > 0;
    } catch (err) {
        console.error("Database query error:", err);
        throw err;
    }
}
