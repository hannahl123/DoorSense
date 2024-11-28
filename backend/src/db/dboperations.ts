import mariadb from 'mariadb';
import config from './dbconfig';
import {Notification} from '../models/Notifications';
import {Activity} from '../models/Activity';

const pool = mariadb.createPool(config);

export async function GetNotificationsbyCategories(
    important: number | null,
    weather: number | null,
    visitor: number | null,
    parcel: number | null,
    reminders: number | null,
    unread: number | null,
    start_date: string | null,
    end_date: string | null
): Promise<Notification[]> {
    try {
        // Assign default values for start_date and end_date if not provided
        const defaultStartDate = "1970-01-01"; // Very early date
        const defaultEndDate = "9999-12-31"; // Very far future date

        const query = `
            SELECT * 
            FROM notifications 
            WHERE 
                (important = ? OR ? IS NULL) AND
                (weather = ? OR ? IS NULL) AND
                (visitor = ? OR ? IS NULL) AND
                (parcel = ? OR ? IS NULL) AND
                (reminders = ? OR ? IS NULL) AND
                (unread = ? OR ? IS NULL) AND
                date >= ? AND date <= ?
            ORDER BY date DESC
        `;

        // Use default dates if not provided
        const results = await pool.query(
            query,
            [
                important, important,
                weather, weather,
                visitor, visitor,
                parcel, parcel,
                reminders, reminders,
                unread, unread,
                start_date || defaultStartDate,
                end_date || defaultEndDate,
            ]
        );

        // console.log("Query results:", results);

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
