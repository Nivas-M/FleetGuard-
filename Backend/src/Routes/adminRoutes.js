const express = require('express');
const router = express.Router();

const { getDashboard } = require('../Controllers/adminController');

router.get('/dashboard', getDashboard);

module.exports = router;