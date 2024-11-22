"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const logger_1 = require("./middleware/logger");
const NotificationRoutes_1 = __importDefault(require("./routes/NotificationRoutes"));
const ActivityRoutes_1 = __importDefault(require("./routes/ActivityRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// Middleware
app.use(body_parser_1.default.json());
app.use(logger_1.logger);
// Routes
app.use('/notifications', NotificationRoutes_1.default);
app.use('/activities', ActivityRoutes_1.default);
// Default Route
app.get('/', (req, res) => {
    res.send('Homepage for Doorsense api!');
});
exports.default = app;
