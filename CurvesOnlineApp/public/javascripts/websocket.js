var webSocket = new WebSocket('ws://isti115.no-ip.org:3000/');

webSocket.addEventListener('open', function (e) {
  console.log('Connection open.')
}, false);

webSocket.addEventListener('close', function (e) {
  console.log('Connection closed.')
}, false);

// webSocket.addEventListener('message', function (message) {
//   console.log('Incoming message:' + message.data);
// }, false);

webSocket.addEventListener('error', function (e) {
  console.log('Error:' + e.data)
}, false);

webSocket.addEventListener('message', function (message) {
  var parsedMessage = JSON.parse(message.data);
  
  if(parsedMessage.type == 'CircleData')
  {
    var currentCircle = parsedMessage.data;
    drawCircle(currentCircle);
    grid[Math.floor(currentCircle.x / step)][Math.floor(currentCircle.y / step)] = 1;
    
    if(typeof grid[Math.floor(currentCircle.x / step)] == 'undefined')
    {
      console.log(currentCircle.x);
    }
    
    //console.log(grid, Math.floor(currentCircle.x / step), Math.floor(currentCircle.y / step));
  }
  
  else if(parsedMessage.type == 'PlayerList')
  {
    var playerList = parsedMessage.data;
    printPlayers(playerList);
  }
}, false);