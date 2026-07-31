const express = require("express");

const router = express.Router();

const authenticate = require("../../Middleware/authMiddleware");
const authorize = require("../../Middleware/roleMiddleware");

const controller = require("./report.controller");

router.use(authenticate);

router.use(authorize("Fleet Manager"));

router.get(
    "/fleet-summary",
    controller.getFleetSummary
);

router.get(
    "/compliance",
    controller.getComplianceReport
);

router.get(
    "/service",
    controller.getServiceReport
);

router.get(
    "/assignments",
    controller.getAssignmentReport
);

module.exports = router;