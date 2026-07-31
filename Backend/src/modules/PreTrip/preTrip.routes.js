const express = require("express");

const router = express.Router();

const authenticate = require("../../Middleware/authMiddleware");
const authorize = require("../../Middleware/roleMiddleware");

const controller = require("./preTrip.controller");

router.use(authenticate);
router.use(authorize("Fleet Manager"));

router.get(
    "/pretrip",
    controller.getAllInspections
);

router.get(
    "/pretrip/failed",
    controller.getFailedInspections
);

router.get(
    "/pretrip/:inspectionId",
    controller.getInspectionById
);

module.exports = router;