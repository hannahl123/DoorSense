export class Notification {
    id: number;
    title: string;
    important: number;
    weather: number;
    visitor: number;
    parcel: number;
    reminders: number;
    unread: number;
    date: string;
    image: Buffer | null;

    constructor(
        id: number,
        title: string,
        important: number,
        weather: number,
        visitor: number,
        parcel: number,
        reminders: number,
        unread: number,
        date: string,
        image: Buffer | null
    ) {
        this.id = id;
        this.title = title;
        this.important = important;
        this.weather = weather;
        this.visitor = visitor;
        this.parcel = parcel;
        this.reminders = reminders;
        this.unread = unread;
        this.date = date;
        this.image = image;
    }
}