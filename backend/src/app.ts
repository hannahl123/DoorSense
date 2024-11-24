import express from 'express';
import bodyParser from 'body-parser';
import { logger } from './middleware/logger';
import notificationRoutes from './routes/NotificationRoutes';
import activityRoutes from './routes/ActivityRoutes';
import cors from 'cors';

const app = express();
app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use(logger);

// Routes
app.use('/notifications', notificationRoutes);
app.use('/activities', activityRoutes);

// Default Route
app.get('/', (req, res) => {
    res.send('Homepage for Doorsense api!');
});

export default app;
