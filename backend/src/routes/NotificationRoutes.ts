import { Router } from 'express';
import * as NotificationController from '../controllers/NotificationsController';
import { validateNotificationRequest } from '../middleware/validator';
import upload from '../middleware/upload';

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

router.post('/', upload.single('image'),validateNotificationRequest, async (req, res, next) => {
    try {
        const { title, important, weather, visitor, parcel, reminders, unread, date } = req.body || req.query;
        const image: Buffer | null = req.file
        ? req.file.buffer
        : req.query.file && typeof req.query.file === 'string'
        ? Buffer.from(req.query.file, 'base64')
        : null;
        console.log('Body:', req.body);
        console.log('File:', req.file);

        const id = await NotificationController.AddNotification(
            title,
            Number(important),
            Number(weather),
            Number(visitor),
            Number(parcel),
            Number(reminders),
            Number(unread),
            date,
            image
        );
        const imageUrl = image
            ? `${req.protocol}://${req.get('host')}/notifications/image/${id}`
            : null;

        res.status(201).json({ id, imageUrl });
    } catch (err) {
        console.error("Error creating notification:", err);
        next(err);
    }
});

router.delete('/', async (req, res, next) => {
    try {
        const deletedCount = await NotificationController.DeleteAllNotifications();
        res.status(200).json({ message: `Deleted ${deletedCount} notifications.` });
    } catch (err) {
        next(err);
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

router.get('/image/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid notification ID' });
            return;
        }

        const notification = await NotificationController.GetNotificationsById(id);

        if (!notification || !notification[0].image) {
            res.status(404).json({ error: 'Image not found for this notification.' });
            return;
        }

        res.set('Content-Type', 'image/png'); // Change MIME type based on stored image format
        res.send(notification[0].image);
    } catch (err) {
        next(err);
    }
});


export default router;