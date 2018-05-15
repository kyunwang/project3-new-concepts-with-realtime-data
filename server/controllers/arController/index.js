const SockJS = require('sockjs-client-node');
const Stomp = require('stompjs');

const amqp = require('amqplib');

// Import sock js stuff
// const sockjs = require('sockjs');
const sockConnect = require('../../sockConnect');

require('dotenv').config({ path: '../../../vars.env' });

exports.tourView = (req, res) => {
	res.render('arViews/tourView', { enableAr: true, enableD3: true });
};

// Can be deleted P.S. delete the template too
exports.testRoute = (req, res) => {
	res.render('arViews/testRoute', { message: 'd3 test page', enableD3: true, amqp: amqp });
};

exports.apiTest = (req, res) => {
	res.render('arViews/api', { message: 'Api test page', data: stomp.data });
};

// Connect to stomp data stream (sockets)
exports.getApiEnergy = (req, res, next) => {
	sockConnect(req.echo);
	next();
};

// Connect to a amqp server for real time data from the aquaponics: example
// {
// 	"ph": 6.03051,
// 	"mscm2": 1.30363,
// 	"water_temp": 23.5625,
// 	"humidity": 40.98944,
// 	"room_temp": 25.08323,
// 	"lux": 14145,
// 	"date": "14-05-2018",
// 	"time": "10:16:36"
// }
exports.getApiAqua = (req, res, next) => {
	amqp.connect('amqp://consumer:zHJR6WPpgUDLt5cF@rabbit.spectral.energy/').then(function(conn) {
		process.once('SIGINT', function() {
			conn.close();
		});
		return conn.createChannel().then(function(channel) {
			channel.assertExchange('aquaponics', 'topic', { durable: true }).then(result => {
				var queue = channel.assertQueue('', { exclusive: true });
				queue = queue.then(function(_queue) {
					channel.bindQueue(_queue.queue, 'aquaponics', 'deceuvel');
					console.log(_queue);
					return channel.consume(
						_queue.queue,
						function(msg) {
							console.log(" [x] Received '%s'", msg.content.toString());
						},
						{ noAck: true }
					);
				});
				return queue.then(function(_consumeOk) {
					console.log(' [*] Waiting for messages. To exit press CTRL+C');
				});
			});
		});
	});
};
