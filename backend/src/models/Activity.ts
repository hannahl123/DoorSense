export class Activity {
    id: number;
    activity: string;
    time: string;

    constructor(id: number, activity: string, time: string) {
        this.id = id;
        this.activity = activity;
        this.time = time;
    }
}
