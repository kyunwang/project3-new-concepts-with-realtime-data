
const express = require('express');
const wController = require('../controllers/websiteController');

const router = express.Router();

router.get('/', wController.homePage);

module.exports = router;
