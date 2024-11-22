"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetNotificationsbyCategories = GetNotificationsbyCategories;
exports.GetRecentActivity = GetRecentActivity;
exports.AddNotification = AddNotification;
exports.AddActivity = AddActivity;
exports.deleteAllNotifications = deleteAllNotifications;
exports.DeleteNotificationById = DeleteNotificationById;
const mariadb_1 = __importDefault(require("mariadb"));
const dbconfig_1 = __importDefault(require("./dbconfig"));
const Notifications_1 = require("../models/Notifications");
const Activity_1 = require("../models/Activity");
const pool = mariadb_1.default.createPool(dbconfig_1.default);
function GetNotificationsbyCategories(important, weather, visitor, parcel, reminders, unread, start_date, end_date) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const results = yield pool.query(`
            SELECT * 
            FROM notifications 
            WHERE (important = ? OR weather = ? OR visitor = ? OR parcel = ? OR reminders = ? OR unread = ?)
            AND date >= ? AND date <= ?`, [important, weather, visitor, parcel, reminders, unread, start_date, end_date]);
            return results.map((result) => new Notifications_1.Notification(result.id, result.title, result.important, result.weather, result.visitor, result.parcel, result.reminders, result.unread, result.date));
        }
        catch (err) {
            console.error("Database query error:", err);
            throw err;
        }
    });
}
function GetRecentActivity(limit) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const results = yield pool.query(`
            SELECT * 
            FROM activity_log 
            ORDER BY time DESC 
            LIMIT ?`, [limit]);
            return results.map((result) => new Activity_1.Activity(result.id, result.activity, result.time));
        }
        catch (err) {
            console.error("Database query error:", err);
            throw err;
        }
    });
}
function AddNotification(title, important, weather, visitor, parcel, reminders, unread, date) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield pool.query(`
            INSERT INTO notifications (title, important, weather, visitor, parcel, reminders, unread, date) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [title, important, weather, visitor, parcel, reminders, unread, date]);
            const insertId = Number(result.insertId);
            console.log("Notification added with ID:", insertId);
            return insertId;
        }
        catch (err) {
            console.error("Database query error:", err);
            throw err;
        }
    });
}
function AddActivity(activity, time) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield pool.query(`
            INSERT INTO activity_log (activity, time) 
            VALUES (?, ?)`, [activity, time]);
            const insertId = Number(result.insertId);
            console.log("Activity added with ID:", insertId);
            return insertId;
        }
        catch (err) {
            console.error("Database query error:", err);
            throw err;
        }
    });
}
function deleteAllNotifications() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield pool.query(`
            DELETE FROM notifications
            `);
            console.log(`${result.affectedRows} notifications deleted.`);
            return result.affectedRows;
        }
        catch (err) {
            console.error("Database query error:", err);
            throw err;
        }
    });
}
function DeleteNotificationById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield pool.query(`
            DELETE FROM notifications WHERE id = ?
            `, [id]);
            console.log(`Notification with ID ${id} deleted.`);
            return result.affectedRows > 0;
        }
        catch (err) {
            console.error("Database query error:", err);
            throw err;
        }
    });
}
