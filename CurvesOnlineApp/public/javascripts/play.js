var canvas, context;

var radius;
var color;

var play_init = function() {
  canvas = document.getElementById('field');
  context = canvas.getContext('2d');
  
  document.getElementById('colorRed').addEventListener('change', colorChanged, false);
  document.getElementById('colorGreen').addEventListener('change', colorChanged, false);
  document.getElementById('colorBlue').addEventListener('change', colorChanged, false);
  
  colorChanged();
  
  document.getElementById('radius').addEventListener('change', radiusChanged, false);
  
  radiusChanged();
  
  document.getElementById('snakeButton').addEventListener('click', snake_init, false);
  document.getElementById('snakeOffButton').addEventListener('click', function(){stop = true;}, false);
  
  document.getElementById('saveButton').addEventListener('click', save, false);
  
  document.getElementById('joinButton').addEventListener('click', join, false);
};

window.addEventListener('load', play_init, false);

var join = function() {
  var username = document.getElementById('usernameInput').value;
  var room = document.getElementById('roomInput').value;
  
  socketSendString({type:'join', data:{username:username, room:room}});
  
  window.history.replaceState('', '', '/play/' + room);
  document.getElementById('joinDialogContainer').style.display = 'none';
};

var getHexColor = function(dec) {
  return ('0' + parseInt(dec).toString(16)).slice(-2);
};

var colorChanged = function() {
  color = '#';
  
  color += getHexColor(document.getElementById('colorRed').value);
  color += getHexColor(document.getElementById('colorGreen').value);
  color += getHexColor(document.getElementById('colorBlue').value);
  
  document.getElementById('colorPreview').style.backgroundColor = color;
  document.getElementById('radiusPreview').style.backgroundColor = color;
};

var radiusChanged = function() {
  radius = document.getElementById('radius').value;
  document.getElementById('radiusPreview').style.width = radius + 'px';
  document.getElementById('radiusPreview').style.height = radius + 'px';
};

var printIps = function(ipList) {
  var playerList = document.getElementById('playerList');
  
  while(playerList.hasChildNodes())
  {
    playerList.removeChild(playerList.firstChild);
  }
  
  for(var i = 0; i < ipList.length; i++)
  {
    var playerListItem = document.createElement('li');
    var playerListItemText = document.createTextNode(ipList[i]);
    
    playerListItem.appendChild(playerListItemText);
    playerList.appendChild(playerListItem);
  }
};

var drawRect = function(Circle) {
  context.fillStyle = Circle.color;
  context.beginPath();
  context.arc(Circle.x, Circle.y, /*Circle.radius*/3, rad(0), rad(360));
  context.fill();
};

var fieldClick = function(e) {
  var currentCircle = new Circle(e.offsetX - (radius/2) , e.offsetY - (radius/2), color, radius);
  socketSendString({type:'CircleData', data: currentCircle});
};

var save = function()
{
  window.open(canvas.toDataURL('image/png'));
};

var Circle = function(x, y, color, radius){
  this.x = x;
  this.y = y;
  this.color = color;
  this.radius = radius;
};