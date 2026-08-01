const express = require("express");

const router = express.Router();

const mechanicController =
require("../Controllers/mechanicController");

const authMiddleware =
require("../Middleware/authMiddleware");

const roleMiddleware =
require("../Middleware/roleMiddleware");

router.get(

    "/dashboard",

    authMiddleware,

    roleMiddleware("Mechanic"),

    mechanicController.dashboard

);

router.post(

    "/log-service",

    authMiddleware,

    roleMiddleware("Mechanic"),

    mechanicController.logService

);

module.exports = router;