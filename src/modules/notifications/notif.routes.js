import { Router } from "express";
import { verifyToken } from "../../middlewares/auth.js";
import { sendNotification, getUserNotifications, markAsRead } from "./notif.controller.js";

const router = Router();

router.post(
  "/send",
  verifyToken(["Admin", "Superadmin", "Staff"]),
  sendNotification
);

router.get(
  "/user/:userId",
  getUserNotifications
);

router.put(
  "/read/:id",
  markAsRead
);

export default router;
