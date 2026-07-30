const express = require("express");

const router = express.Router();

const authenticate = require("../../Middleware/authMiddleware");
const authorize = require("../../Middleware/roleMiddleware");

const controller = require("./service.controller");

router.use(authenticate);
router.use(authorize("Fleet Manager"));

router.post(
    "/vehicles/:vehicleId/services",
    controller.createService
);

router.get(
    "/vehicles/:vehicleId/services",
    controller.getVehicleServices
);

router.get(
    "/services/:serviceId",
    controller.getServiceById
);
router.patch(
    "/services/:serviceId",
    controller.updateService
);

router.delete(
    "/services/:serviceId",
    controller.deleteService
);

router.get(
    "/services/due",
    controller.getDueServices
);

module.exports = router;