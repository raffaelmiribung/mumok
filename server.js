const express = require('express');
const WebSocket = require('ws');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;


let playerList = [];

app.use(express.static('public'));

app.listen(PORT, () => {
	console.log(`Server started on port: ${PORT}`);
});

const wsServer = new WebSocket.Server({ port: 3001 });

wsServer.on('connection', (ws) => {
  console.log('Client connected');

	ws.on('message', (data) => {
		
		data = JSON.parse(data);

		events[data.type](data.message);
	});

});

const events = {
	newUser: (userName) => {
		console.log(`Player ${userName} joined`);

		playerList.push(userName);
	}
}


wsServer.on('close', () => {
	console.log('Client disconnected');
});

setInterval(() => {
  wsServer.clients.forEach((client) => {
    client.send(JSON.stringify(playerList));
  });
}, 50);