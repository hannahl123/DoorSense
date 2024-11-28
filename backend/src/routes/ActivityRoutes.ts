import { Router, Request, Response, NextFunction } from 'express';
import * as ActivityController from '../controllers/ActivityController';

const router = Router();

router.get('/',async (req, res) =>{
    try{
        const limit = Number(req.query.limit || 10);
        const logs = await ActivityController.GetRecentActivity(limit);
        res.json(logs);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch activity logs.' });
    }
});

router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const activity = req.body.activity || req.query.activity;
        const time = req.body.time || req.query.time;
        console.log('Body:', req.body); // Logs the parsed body
        console.log('Query Parameters:', req.query); // Logs the query parameters

        console.log('Activity:', activity); // Logs the resolved `activity`
        console.log('Time:', time); // Logs the resolved `time`

        if (!activity || typeof activity !== 'string') {
            res.status(400).json({ error: 'Activity is required and must be a string.' });
            return;
        }
        if (!time || isNaN(Date.parse(time))) {
            res.status(400).json({ error: 'Invalid time format.' });
            return;
        }
        const id = await ActivityController.AddActivity(activity, time);

        res.status(201).json({ id });
    } catch (err) {
        next(err);
    }
});

export default router;