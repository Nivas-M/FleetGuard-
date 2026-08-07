const express = require("express");

const router = express.Router();

const fleetManagerController = require("../Controllers/fleetManagerController");

const authMiddleware = require("../Middleware/authMiddleware");

const roleMiddleware = require("../Middleware/roleMiddleware");

router.use(authMiddleware);

router.use(roleMiddleware("Fleet Manager"));

router.get(

    "/dashboard",

    fleetManagerController.getDashboard

);

router.post(

    "/assign-vehicle",

    fleetManagerController.assignVehicle

);

module.exports = router;