import { Router, Request, Response, NextFunction } from 'express';
import * as ActivityController from '../controllers/ActivityController';

const router = Router();

interface ActivityRequestBody {
    activity: string;
    time: string;
}

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
        const { activity, time } = req.body;

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