const express = require("express");

const router = express.Router();

const dashboardController = require("./dashboard.controller");

const authenticate = require("../../Middleware/authMiddleware");
const authorize = require("../../Middleware/roleMiddleware");

router.use(authenticate);
router.use(authorize("Fleet Manager"));

router.get("/", dashboardController.getDashboard);

module.exports = router;