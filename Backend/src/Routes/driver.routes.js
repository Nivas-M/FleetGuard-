const express = require("express");

const router = express.Router();

const authenticate = require("../Middleware/authMiddleware");
const authorize = require("../Middleware/roleMiddleware");

const driverController = require("./driver.controller");

router.use(authenticate);
router.use(authorize("Fleet Manager"));

router.get("/", driverController.getDrivers);

router.get("/:id", driverController.getDriverById);

router.get("/:id/assignments", driverController.getDriverAssignments);

module.exports = router;