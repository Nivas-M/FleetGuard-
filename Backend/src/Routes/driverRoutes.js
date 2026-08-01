const express = require("express");

const router = express.Router();

const driverController = require("../Controllers/driverController");

const authMiddleware = require("../Middleware/authMiddleware");

const roleMiddleware = require("../Middleware/roleMiddleware");

/**
 * Driver Dashboard
 */
router.get(

    "/dashboard",

    authMiddleware,

    roleMiddleware("Driver"),

    driverController.dashboard

);

/**
 * Submit Checklist
 */
router.post(

    "/pre-trip-checklist",

    authMiddleware,

    roleMiddleware("Driver"),

    driverController.submitChecklist

);

module.exports = router;