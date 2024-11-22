"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const NotificationController = __importStar(require("../controllers/NotificationsController"));
const validator_1 = require("../middleware/validator");
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { important, weather, visitor, parcel, reminders, unread, start_date, end_date } = req.query;
        const notifications = yield NotificationController.GetNotificationsByCategories(Number(important || 0), Number(weather || 0), Number(visitor || 0), Number(parcel || 0), Number(reminders || 0), Number(unread || 0), start_date, end_date);
        res.json(notifications);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch notifications.' });
    }
}));
router.post('/', validator_1.validateNotificationRequest, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, important, weather, visitor, parcel, reminders, unread, date } = req.body;
        const id = yield NotificationController.AddNotification(title, Number(important), Number(weather), Number(visitor), Number(parcel), Number(reminders), Number(unread), date);
        // Send success response with the new notification ID
        res.status(201).json({ id });
    }
    catch (err) {
        // Log error and send a proper JSON response
        console.error("Error creating notification:", err);
        next(err);
    }
}));
router.delete('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedCount = yield NotificationController.DeleteAllNotifications();
        res.status(200).json({ message: `Deleted ${deletedCount} notifications.` });
    }
    catch (err) {
        next(err); // Pass the error to the error-handling middleware
    }
}));
router.delete('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid notification ID' });
            return;
        }
        const deleted = yield NotificationController.deleteNotificationById(id);
        if (deleted) {
            res.status(200).json({ message: `Notification with ID ${id} deleted.` });
        }
        else {
            res.status(404).json({ error: `Notification with ID ${id} not found.` });
        }
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
