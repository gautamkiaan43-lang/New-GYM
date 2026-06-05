import { sendNotificationService, getUserNotificationsService, markAsReadService } from "./notif.service.js";

export const sendNotification = async (req, res, next) => {
  try {
    const log = await sendNotificationService(req.body);
    res.json({ success: true, log });
  } catch (err) {
    next(err);
  }
};

export const getUserNotifications = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const notifications = await getUserNotificationsService(userId);
    res.json({ success: true, notifications });
  } catch (err) {
    next(err);
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    await markAsReadService(id);
    res.json({ success: true, message: "Notification marked as read" });
  } catch (err) {
    next(err);
  }
};
