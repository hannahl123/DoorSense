"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
class Notification {
    constructor(id, title, important, weather, visitor, parcel, reminders, unread, date) {
        this.id = id;
        this.title = title;
        this.important = important;
        this.weather = weather;
        this.visitor = visitor;
        this.parcel = parcel;
        this.reminders = reminders;
        this.unread = unread;
        this.date = date;
    }
}
exports.Notification = Notification;
