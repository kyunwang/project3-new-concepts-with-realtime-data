const SockJS = require('sockjs-client-node');
const Stomp = require('stompjs');

function sockConnect(echo) {
	console.log(echo);

	echo.on('connection', function(connec) {
		console.log('connected');

		// Connect to the stomp stream
		connectStomp();

		connec.on('data', function(message) {
			console.log('On data', message);
			connec.write(message);
			// sock.close();
		});

		connec.on('close', function() {
			console.log('Closed sock connection');
		});

		function connectStomp() {
			console.log('Start Stomp');

			const endpoint = '/exchange/power/11'; // 11 = Piepschuimhuis 2A
			// const endpoint = '/exchange/power/#'; // Gets all

			const stomp = {
				url: new SockJS('https://app.jouliette.net/stomp'),
				client: null,
				data: [],
				init: function() {
					this.client = Stomp.over(this.url);
					this.client.connect(
						process.env.USERNAME,
						process.env.PASSWORD,
						this.onConnect,
						this.onError,
						'/'
					);
				},
				onError(err) {
					console.error('Error incoming: ', err);
				},
				onConnect() {
					console.log('Connected');
					stomp.client.subscribe(endpoint, stomp.onData);
				},
				onData(d) {
					// console.log(d);
					stomp.data.push(d.body);
					connec.write(d.body);
				},
			};

			// Initialize
			stomp.init();
		}
	});
}

module.exports = sockConnect;
