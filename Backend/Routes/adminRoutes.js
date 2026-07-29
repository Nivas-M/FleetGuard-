const express = require('express');
const router = express.Router();

const { getDashboard } = require('../Controllers/adminController');
const { getVehicles, getVehicleById } = require('../Controllers/vehicleController');

router.get('/dashboard', getDashboard);
router.get('/vehicles', getVehicles);
router.get('/vehicles/:vehicleId', getVehicleById);


module.exports = router;