const express = require('express');
const arController = require('../controllers/arController');
const Stomp = require('@stomp/stompjs');

const router = express.Router();
const client = Stomp.client(process.env.THE_URL);

router.get('/', arController.apiTest);

module.exports = router;
