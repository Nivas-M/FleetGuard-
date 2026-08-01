const express = require("express");
const router = express.Router();

const {
  getVehicleById,
} = require("../controllers/vehicleController");

router.get("/:vehicleId", getVehicleById);

module.exports = router;