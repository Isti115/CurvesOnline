"use strict";

var width, height;

var keyDown = new Array();

var x, y;
var step;
var direction, curveRatio;

var stop = false;

var snake_init = function() {
  window.addEventListener("keydown", keydown, false);
  window.addEventListener("keyup", keyup, false);
  
  width = canvas.width;
  height = canvas.height;
  
  x = Math.random() * width;
  y = Math.random() * height;
  
  step = 10;
  direction = 0;
  curveRatio = 3;
  
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
};

var control = function() {
  if(keyDown[37]) {
    direction += curveRatio;
  }
  
  if(keyDown[39]) {
    direction -= curveRatio;
  }
  
  console.log(direction);
};

var getHexColor = function(dec) {
  return ('0' + parseInt(dec).toString(16)).slice(-2);
};

var getPixel = function(x, y) {
  var pixel = context.getImageData(x, y, 1, 1);
  return '#' + getHexColor(pixel.data[0]) + getHexColor(pixel.data[1]) + getHexColor(pixel.data[2]);
};

var update = function() {
  x = limit(x + Math.sin(rad(direction)), width);
  y = limit(y + Math.cos(rad(direction)), height);
};

var draw = function() {
  var currentCircle = new Circle(x, y, color, radius);
  socketSendString({type:'CircleData', data: currentCircle});
};