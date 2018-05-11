const express = require('express');
const arController = require('../controllers/arController');

const router = express.Router();

router.get('/', arController.getApiData, arController.tourView);
router.get('/d3', arController.getApiData, arController.d3Tests);

module.exports = router;
