'use strict';

var keyDown = [];

var x, y;
var prevX, prevY;

var step;
var direction, turningSpeed;

var stop;

var snake_init = function() {
  window.addEventListener('keydown', keydown, false);
  window.addEventListener('keyup', keyup, false);
  
  x = Math.random() * width;
  y = Math.random() * height;
  
  prevX = x;
  prevY = y;
  
  step = radius;
  direction = 0;
  turningSpeed = 2;
  
  stop = false;
  main();
};

var keydown = function(e) {
  keyDown[e.keyCode] = true;
};

var keyup = function(e) {
  keyDown[e.keyCode] = false;
};

var limit = function(value, range) {
  return (value + range) % range;
};

var rad = function(deg) {
  return (Math.PI / 180) * deg;
};

var main = function() {
  control();
  update();
  draw();
  
  if(!stop) {
    window.requestAnimationFrame(main);
  }
  
  else
  {
    document.getElementById('messageOutput').innerHTML += 'game over...';
  }
};

var control = function() {
  if(keyDown[37]) {
    direction += turningSpeed;
  }
  
  if(keyDown[39]) {
    direction -= turningSpeed;
  }
};

var getHexColor = function(dec) {
  return ('0' + parseInt(dec).toString(16)).slice(-2);
};

var getPixel = function(x, y) {
  var pixel = context.getImageData(x, y, 1, 1);
  return '#' + getHexColor(pixel.data[0]) + getHexColor(pixel.data[1]) + getHexColor(pixel.data[2]);
};

var update = function() {
  prevX = x;
  prevY = y;
  
  x = limit(x + Math.sin(rad(direction)) * step, width);
  y = limit(y + Math.cos(rad(direction)) * step, height);
  
  if (grid[Math.floor(x / step)][Math.floor(y / step)] == 1) {
    stop = true;
  }
  
  // grid[Math.floor(prevX / step)][Math.floor(prevY / step)] = 1;
};

var draw = function() {
  var currentCircle = new Circle(prevX, prevY, color, radius);
  socketSendString({type:'CircleData', data: currentCircle});
};