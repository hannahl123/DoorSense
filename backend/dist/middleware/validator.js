"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNotificationRequest = validateNotificationRequest;
function validateNotificationRequest(req, res, next) {
    const { title, important, weather, visitor, parcel, reminders, unread, date } = req.body;
    if (!title || typeof title !== 'string') {
        res.status(400).json({ error: 'Title is required and must be a string.' });
        return;
    }
    if (!date || isNaN(Date.parse(date))) {
        res.status(400).json({ error: 'Invalid date.' });
        return;
    }
    // Pass the request to the next middleware/handler
    next();
}
