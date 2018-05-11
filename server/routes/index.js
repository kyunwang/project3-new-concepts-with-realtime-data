
const express = require('express');
const wController = require('../controllers/websiteController');

const router = express.Router();

router.get('/', wController.homePage);

router.get('/zeroState', wController.zeroState);

router.get('/home', wController.infoPage);

module.exports = router;
