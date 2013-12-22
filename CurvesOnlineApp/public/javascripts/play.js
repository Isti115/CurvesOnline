'use strict';

var canvas, context;

var width, height;

var radius;
var color;

var grid;

var play_init = function() {
  radius = 3;
  
  canvas = document.getElementById('field');
  context = canvas.getContext('2d');
  
  width = canvas.width;
  height = canvas.height;
  
  grid = [];
  
  for(var i = 0; i < width / radius; i++) {
    grid[i] = [];
    
    for(var j = 0; j < height / radius; j++) {
      grid[i][j] = 0;
    }
  }
  
  document.getElementById('colorRed').addEventListener('change', colorChanged, false);
  document.getElementById('colorGreen').addEventListener('change', colorChanged, false);
  document.getElementById('colorBlue').addEventListener('change', colorChanged, false);
  
  colorChanged();
  
  document.getElementById('snakeButton').addEventListener('click', snake_init, false);
  document.getElementById('snakeOffButton').addEventListener('click', function(){stop = true;}, false);
  
  document.getElementById('saveButton').addEventListener('click', save, false);
  
  document.getElementById('joinButton').addEventListener('click', join, false);
};

window.addEventListener('load', play_init, false);

var join = function() {
  var username = document.getElementById('usernameInput').value;
  var room = document.getElementById('roomInput').value;
  
  socketSendString({type:'Join', data:{username:username, room:room}});
  
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
};

var printPlayers = function(playerList) {
  var playerListUl = document.getElementById('playerList');
  
  while(playerListUl.hasChildNodes())
  {
    playerListUl.removeChild(playerListUl.firstChild);
  }
  
  for(var i = 0; i < playerList.length; i++)
  {
    var playerListItem = document.createElement('li');
    var playerListItemText = document.createTextNode(playerList[i]);
    
    playerListItem.appendChild(playerListItemText);
    playerListUl.appendChild(playerListItem);
  }
};

var drawCircle = function(circle) {
  context.fillStyle = circle.color;
  context.beginPath();
  context.arc(circle.x, circle.y, circle.radius, rad(0), rad(360));
  context.fill();
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