import * as db from '../db/dboperations';
import { Activity } from '../models/Activity';

export async function GetRecentActivity(
    limit: number,
): Promise<Activity[]> {
    return await db.GetRecentActivity(limit);
}

export async function AddActivity(
    activity: string,
    time: string
): Promise<number> {
    return await db.AddActivity(activity, time);
}
