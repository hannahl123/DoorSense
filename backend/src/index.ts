import * as NotificationController from './controllers/NotificationsController';
import * as ActivityController from './controllers/ActivityController';

async function main() {
    try {
        // Example: Add a notification
        const newNotificationId = await NotificationController.AddNotification(
            'Important Update',
            1, 0, 0, 0, 0, 1,
            '2024-11-21'
        );
        console.log('New Notification ID:', newNotificationId);

        // Example: Fetch notifications
        const notifications = await NotificationController.GetNotificationsByCategories(
            1, 0, 0, 0, 0, 1,
            '2024-11-01',
            '2024-11-21'
        );
        console.log('Notifications:', notifications);

        // Example: Add an activity
        const newActivityId = await ActivityController.AddActivity('User logged in', '2024-11-21T12:00:00');
        console.log('New Activity ID:', newActivityId);

        // Example: Fetch recent logs
        const logs = await ActivityController.GetRecentActivity(5);
        console.log('Recent Logs:', logs);
    } catch (err) {
        console.error('Error:', err);
    }
}

main();
