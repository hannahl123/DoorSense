import { Router } from 'express';
import * as NotificationController from '../controllers/NotificationsController';
import { validateNotificationRequest } from '../middleware/validator';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const { important, weather, visitor, parcel, reminders, unread, start_date, end_date } = req.query;
        const notifications = await NotificationController.GetNotificationsByCategories(
            Number(important || 0),
            Number(weather || 0),
            Number(visitor || 0),
            Number(parcel || 0),
            Number(reminders || 0),
            Number(unread || 0),
            start_date as string,
            end_date as string
        );
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch notifications.' });
    }
});

router.post('/', validateNotificationRequest, async (req, res, next) => {
    try {
        const { title, important, weather, visitor, parcel, reminders, unread, date } = req.body;

        const id = await NotificationController.AddNotification(
            title,
            Number(important),
            Number(weather),
            Number(visitor),
            Number(parcel),
            Number(reminders),
            Number(unread),
            date
        );

        // Send success response with the new notification ID
        res.status(201).json({ id });
    } catch (err) {
        // Log error and send a proper JSON response
        console.error("Error creating notification:", err);
        next(err);
    }
});

router.delete('/', async (req, res, next) => {
    try {
        const deletedCount = await NotificationController.DeleteAllNotifications();
        res.status(200).json({ message: `Deleted ${deletedCount} notifications.` });
    } catch (err) {
        next(err); // Pass the error to the error-handling middleware
    }
});

router.delete('/:id', async (req, res, next): Promise<void> => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid notification ID' });
            return;
        }

        const deleted = await NotificationController.deleteNotificationById(id);
        if (deleted) {
            res.status(200).json({ message: `Notification with ID ${id} deleted.` });
        } else {
            res.status(404).json({ error: `Notification with ID ${id} not found.` });
        }
    } catch (err) {
        next(err);
    }
});

export default router;