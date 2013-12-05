var webSocket = new WebSocket('ws://localhost:3000/');

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
    drawRect(currentCircle);
  }
  
  else if(parsedMessage.type == 'iplist')
  {
    var ipList = parsedMessage.data;
    printIps(ipList)
  }
}, false);