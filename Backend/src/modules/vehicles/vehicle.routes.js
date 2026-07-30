const express = require("express");

const router = express.Router();

const authenticate = require("../../Middleware/authMiddleware");
const authorize = require("../../Middleware/roleMiddleware");

const vehicleController = require("./vehicle.controller");

router.use(authenticate);
router.use(authorize("Fleet Manager"));

router.post("/", vehicleController.createVehicle);

router.get("/", vehicleController.getVehicles);

router.get("/:vehicleId", vehicleController.getVehicleById);

router.patch("/:vehicleId", vehicleController.updateVehicle);

router.patch("/:vehicleId/status", vehicleController.updateVehicleStatus);

router.patch("/:vehicleId/mileage", vehicleController.updateMileage);

router.delete("/:vehicleId", vehicleController.deleteVehicle);

module.exports = router;
