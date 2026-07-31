const express = require("express");

const router = express.Router();

const authenticate = require("../../Middleware/authMiddleware");
const authorize = require("../../Middleware/roleMiddleware");

const controller = require("./notification.controller");

router.use(authenticate);
router.use(authorize("Fleet Manager"));

router.get(
    "/notifications",
    controller.getNotifications
);

router.patch(
    "/notifications/:notificationId/read",
    controller.markAsRead
);

router.patch(
    "/notifications/read-all",
    controller.markAllAsRead
);

module.exports = router;