const express = require("express");

const router = express.Router();

const authenticate = require("../../Middleware/authMiddleware");
const authorize = require("../../Middleware/roleMiddleware");

const controller = require("./preTrip.controller");

router.use(authenticate);
router.use(authorize("Fleet Manager", "Admin"));

router.get("", controller.getAllInspections);

router.get("/failed", controller.getFailedInspections);

router.get("/:inspectionId", controller.getInspectionById);

module.exports = router;
