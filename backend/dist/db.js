"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mariadb_1 = __importDefault(require("mariadb"));
const pool = mariadb_1.default.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Doorsence',
    connectionLimit: 5,
});
function GetNotificationsbyCategories(important, weather, visitor, parcel, reminders, unread, start_date, end_date) {
    return pool
        .query(`
            SELECT * 
            FROM notifications 
            WHERE (important = ? OR weather = ? OR visitor = ? OR parcel = ? OR reminders = ? OR unread = ?)
            AND date >= ? AND date <= ?`, [important, weather, visitor, parcel, reminders, unread, start_date, end_date])
        .then((results) => {
        return results;
    })
        .catch((err) => {
        console.error("Database query error:", err);
        throw err;
    });
}
function GetRecentLogs(limit = 10) {
    return pool
        .query(`
            SELECT * FROM activity_log LIMIT ?`, [limit])
        .then((results) => {
        return results;
    })
        .catch((err) => {
        console.error("Database query error:", err);
        throw err;
    });
}
function AddNotification(title, important, weather, visitor, parcel, reminders, unread, date) {
    return pool
        .query(`
        INSERT INTO notifications (title, important, weather, visitor, parcel, reminders, unread, date) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [title, important, weather, visitor, parcel, reminders, unread, date])
        .then((result) => {
        console.log("Notification added with ID:", result.insertId);
        return result.insertId;
    })
        .catch((err) => {
        console.error("Database query error:", err);
        throw err;
    });
}
function AddActivity(activity, time) {
    return pool
        .query(`
        INSERT INTO activity_log (activity, time) 
        VALUES (?, ?)`, [activity, time])
        .then((result) => {
        console.log("Activity added with ID:", result.insertId);
        return result.insertId;
    })
        .catch((err) => {
        console.error("Database query error:", err);
        throw err;
    });
}
module.exports = {
    GetNotificationsbyCategories,
    GetRecentLogs,
    AddNotification,
    AddActivity,
};
