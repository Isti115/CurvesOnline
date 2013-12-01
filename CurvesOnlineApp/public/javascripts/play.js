var canvas, context;

var size = 10;
var color;

var play_init = function() {
  canvas = document.getElementById('field');
  context = canvas.getContext('2d');
  
  document.getElementById('colorRed').addEventListener('change', colorChanged, false);
  document.getElementById('colorGreen').addEventListener('change', colorChanged, false);
  document.getElementById('colorBlue').addEventListener('change', colorChanged, false);
  
  colorChanged();
  
  document.getElementById('size').addEventListener('change', sizeChanged, false);
  
  sizeChanged();
  
  document.getElementById('snakeButton').addEventListener('click', snake_init, false);
  document.getElementById('snakeOffButton').addEventListener('click', function(){stop = true;}, false);
  document.getElementById('saveButton').addEventListener('click', save, false);
  
  // canvas.addEventListener('click', fieldClick, false);
};

window.addEventListener('load', play_init, false);

var getHexColor = function(dec) {
  return ('0' + parseInt(dec).toString(16)).slice(-2);
}

var colorChanged = function() {
  color = '#';
  
  color += getHexColor(document.getElementById('colorRed').value);
  color += getHexColor(document.getElementById('colorGreen').value);
  color += getHexColor(document.getElementById('colorBlue').value);
  
  document.getElementById('colorPreview').style.backgroundColor = color;
  document.getElementById('sizePreview').style.backgroundColor = color;
}

var sizeChanged = function() {
  size = document.getElementById('size').value;
  document.getElementById('sizePreview').style.width = size + 'px';
  document.getElementById('sizePreview').style.height = size + 'px';
}

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
}

var drawRect = function(rectangle) {
  context.fillStyle = rectangle.color;
  //context.fillRect(rectangle.x, rectangle.y, rectangle.size, rectangle.size);
  context.beginPath();
  context.arc(rectangle.x, rectangle.y, /*rectangle.size*/3, rad(0), rad(360));
  context.fill();
};

var fieldClick = function(e) {
  var currentRectangle = new Rectangle(e.offsetX - (size/2) , e.offsetY - (size/2), color, size);
  socketSendString({type:'rectdata', data: currentRectangle});
};

var save = function()
{
  window.open(canvas.toDataURL("image/png"));
}

var Rectangle = function(x, y, color, size){
  this.x = x;
  this.y = y;
  this.color = color;
  this.size = size;
}