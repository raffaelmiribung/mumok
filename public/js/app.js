var ws = new WebSocket('ws://mumok.herokuapp.com:3001');

var playerList = document.getElementById('playerList');
var playerName = document.getElementById('playerName');
var playerNameSubmit = document.getElementById('playerNameSubmit');

playerNameSubmit.onclick = function(){
	ws.send(JSON.stringify({
		type: 'newUser',
		message: playerName.value
	}));
}


ws.onmessage = function (event) {
  playerList.innerHTML = JSON.parse(event.data).join('<br/>');
};