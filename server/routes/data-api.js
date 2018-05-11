const express = require('express');
const arController = require('../controllers/arController');
const SockJS = require('sockjs-client-node');
const Stomp = require('stompjs');

const router = express.Router();
const allPower = '/exchange/power/#';

require('dotenv').config({path:'./vars.env'});

const stomp = {
  url: new SockJS('https://app.jouliette.net/stomp'),
  client: null,
  data: [],
  init(){
    this.client = Stomp.over(this.url);
    this.client.connect(process.env.USERNAME, process.env.PASSWORD, this.onConnect, console.error, '/')
  },
  onConnect(){
    console.log('connected');
    stomp.client.subscribe(allPower, stomp.onData);
  },
  onData(d){
    stomp.data.push(d.body);
    console.log(stomp.data);
  }
};



stomp.init();

// const echo = sockjs.createServer({ sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js'});
// echo.on('connection', function(connec) {
//   connec.on('data', function(message){
//     connec.write(message);
//     console.log(message);
//   });
//   connec.on('close', function() {
//     console.log('closed');
//   });
// });

router.get('/', arController.apiTest);


module.exports = router;
