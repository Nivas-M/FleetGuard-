const express = require('express');
const router = express.Router();

const {
    getDashboard,
    approveOverrideRequest,
    rejectOverrideRequest
} = require("../Controllers/adminController");
const { getVehicles, getVehicleById } = require('../Controllers/vehicleController');

const authMiddleware = require("../Middleware/authMiddleware");
const roleMiddleware = require("../Middleware/roleMiddleware");

router.get(
    "/admin",
    authMiddleware,
    roleMiddleware("Admin"),
    (req, res) => {

        res.json({
            success: true,
            message: "Welcome Admin",
            user: req.user,
            role: req.role,
        });

    }
);

router.get(
    "/dashboard",
    authMiddleware,
    getDashboard
);

router.put(
    "/override-requests/:requestId/approve",
    authMiddleware,
    roleMiddleware("Admin"),
    approveOverrideRequest
);

router.put(
    "/override-requests/:requestId/reject",
    authMiddleware,
    roleMiddleware("Admin"),
    rejectOverrideRequest
);

router.get('/vehicles', getVehicles);
router.get('/vehicles/:vehicleId', getVehicleById);


module.exports = router;