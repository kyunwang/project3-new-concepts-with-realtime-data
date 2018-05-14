
const express = require('express');
const wController = require('../controllers/websiteController');

const router = express.Router();

router.get('/', wController.homePage);

router.get('/zerostate', wController.zeroState);

router.get('/home', wController.infoPage);

module.exports = router;
