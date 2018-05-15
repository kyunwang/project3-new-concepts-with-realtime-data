
const express = require('express');
const wController = require('../controllers/websiteController');

const router = express.Router();

const arController = require('../controllers/arController');

router.get('/', wController.homePage);

router.get('/zerostate', wController.zeroState);

router.get('/home', arController.getApiEnergy, wController.infoPage);


module.exports = router;
