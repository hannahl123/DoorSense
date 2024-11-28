import { Router, Request, Response, NextFunction } from 'express';
import * as ActivityController from '../controllers/ActivityController';
import * as NotificationController from '../controllers/NotificationsController';

const router = Router();

// Define the route with proper type annotations
router.post(
    '/detections',
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { class_name, confidence, timestamp } = req.body;

            // Validator
            if (!class_name || typeof class_name !== 'string') {
                res.status(400).json({ error: 'class_name is required and must be a string.' });
                return;
            }
            if (confidence === undefined || typeof confidence !== 'number') {
                res.status(400).json({ error: 'confidence is required and must be a number.' });
                return;
            }
            if (!timestamp || isNaN(Date.parse(timestamp))) {
                res.status(400).json({ error: 'Invalid timestamp format.' });
                return;
            }
            var activityId = 0;
            var importance = 0;
            var visitor = 0;
            var parcel = 0;
            // Create an activity log
            if (class_name == 'Parcel'){
                const activityMessage = `Parcel delivered at door`;
                parcel = 1;
                activityId = await ActivityController.AddActivity(activityMessage, timestamp);
                console.log(`Activity created with ID: ${activityId}`);
            }
            
            else if (class_name == 'Person'){
                importance = 1;
                visitor = 1;
                const activityMessage = `Intruder detected`;
                activityId = await ActivityController.AddActivity(activityMessage, timestamp);
                console.log(`Activity created with ID: ${activityId}`);
            }
            else{
                res.status(400).json({ error: `${class_name} is not a valid class name` });
                return;
            }
            // Create a notification
            const notificationTitle = `Detection Alert: ${class_name}`;
            const notificationId = await NotificationController.AddNotification(
                notificationTitle,
                importance, // Important
                0, // Weather
                visitor, // Visitor
                parcel, // Parcel
                0, 
                1, 
                timestamp,
                null // Image
            );
            console.log(`Notification created with ID: ${notificationId}`);
            
            // io.emit('detection',{
            //     message: notificationTitle,
            //     activityId,
            //     notificationId,
            // });
            // console.log("io.emit called with:", {
            //     message: notificationTitle,
            //     activityId,
            //     notificationId,
            // });
            

            // Respond to the client
            res.status(201).json({
                message: 'Detection processed successfully',
                activityId,
                notificationId,
            });
        } catch (err) {
            console.error('Error processing detection:', err);
            next(err);
        }
    }
);

router.post(
    '/door',
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { timestamp } = req.body;

            // Validator
            if (!timestamp || isNaN(Date.parse(timestamp))) {
                res.status(400).json({ error: 'Invalid timestamp format.' });
                return;
            }

            // Create a notification
            const notificationTitle = `Detection Alert: Door`;
            const notificationId = await NotificationController.AddNotification(
                notificationTitle,
                0, // Mark as important
                0, // Weather (not relevant here)
                0, // Visitor (not relevant here)
                0, // Parcel (not relevant here)
                0, // Reminders (not relevant here)
                1, // Mark as unread
                timestamp,
                null // No image in this case
            );
            console.log(`Notification created with ID: ${notificationId}`);

            // io.emit('detection',{
            //     message: 'Door Detection',
            //     activityId: -1,
            //     notificationId,
            // });

            // console.log("io.emit called with:", {
            //     message: notificationTitle,
            //     activityId: -1,
            //     notificationId,
            // });
            
            // Respond to the client
            res.status(201).json({
                message: 'Detection processed successfully',
                notificationId,
            });
        } catch (err) {
            console.error('Error processing detection:', err);
            next(err);
        }
    }
);

export default router;
