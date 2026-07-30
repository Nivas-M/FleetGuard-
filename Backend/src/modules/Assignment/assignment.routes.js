const express = require("express");

const router = express.Router();

const authenticate = require("../../Middleware/authMiddleware");
const authorize = require("../../Middleware/roleMiddleware");

const controller = require("./assignment.controller");

router.use(authenticate);
router.use(authorize("Fleet Manager"));

router.post("/", controller.createAssignment);

router.get("/", controller.getAssignments);

router.get("/active", controller.getActiveAssignments);

router.get("/:id", controller.getAssignmentById);

router.patch(
    "/:id/complete",
    controller.completeAssignment
);

router.patch(
    "/:id/cancel",
    controller.cancelAssignment
);

router.post(
    "/:id/override",
    controller.overrideAssignment
);

module.exports = router;
