var Kinect2 = require('kinect2'),
	express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

var kinect = new Kinect2();

app.use(express.static('public'));

if(kinect.open()) {
	server.listen(8000);
	console.log('Server listening on port 8000');
	console.log('Point your browser to http://localhost:8000');

	kinect.on('bodyFrame', function(bodyFrame){
		console.log(bodyFrame); io.sockets.emit('bodyFrame', bodyFrame);
	});

	kinect.openBodyReader();
}
