const express = require('express');
const arController = require('../controllers/arController');

const router = express.Router();

router.get('/', arController.getApiEnergy, arController.tourView);
router.get('/test', arController.getApiEnergy, arController.testRoute);

module.exports = router;
