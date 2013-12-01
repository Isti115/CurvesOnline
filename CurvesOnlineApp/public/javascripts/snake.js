"use strict";

var width, height;

var keyDown = new Array();
var wasKeyDown = new Array();

var x, y;
var step;
var direction, curveRatio;

var stop = false;
var dynamicSize = false;

function snake_init()
{
  window.addEventListener("keydown", keydown, false);
  window.addEventListener("keyup", keyup, false);
  
  width = canvas.width;
  height = canvas.height;
  
  x = Math.random() * width;
  y = Math.random() * height;
  
  step = 5;
  direction = 0;
  curveRatio = 3;
  
  main();
}

function keydown(e)
{
  keyDown[e.keyCode] = true;
}

function keyup(e)
{
  keyDown[e.keyCode] = false;
}

function limit(value, range)
{
  return (value + range) % range;
}

function rad(deg)
{
  return (Math.PI / 180) * deg;
}

function main()
{
  control();
  update();
  draw();
  
  if(!stop)
  {
    window.requestAnimationFrame(main);
  }
}

function control()
{
  if(keyDown[37])
  {
    wasKeyDown[37] = true;
    
    direction += curveRatio;
  }
  
  else if(wasKeyDown[37] && !keyDown[37])
  {
    wasKeyDown[37] = false;
  }
  
  if(keyDown[39])
  {
    wasKeyDown[39] = true;
    
    direction -= curveRatio;
  }
  
  else if(wasKeyDown[39] && !keyDown[39])
  {
    wasKeyDown[39] = false;
  }
  
  console.log(direction);
}

var getHexColor = function(dec) {
  return ('0' + parseInt(dec).toString(16)).slice(-2);
};

var getPixel = function(x, y) {
  var pixel = context.getImageData(x, y, 1, 1);
  return '#' + getHexColor(pixel.data[0]) + getHexColor(pixel.data[1]) + getHexColor(pixel.data[2]);
};

function update()
{
  x = limit(x + Math.sin(rad(direction)), width);
  y = limit(y + Math.cos(rad(direction)), height);
  
  if(getPixel(x + (Math.sin(rad(direction)) * 5), y + (Math.cos(rad(direction)) * 5)) != "#000000")
  {
    console.log(getPixel(x + (Math.sin(rad(direction)) * 5), y + (Math.cos(rad(direction)) * 5)));
    alert("you lost");
    stop = true;
  }
  
  // if(direction == 0)
  // {
  //   y = limit(y - step, height);
  // }
  
  // else if(direction == 1)
  // {
  //   x = limit(x + step, width);
  // }
  
  // else if(direction == 2)
  // {
  //   y = limit(y + step, height);
  // }
  
  // else if(direction == 3)
  // {
  //   x = limit(x - step, width);
  // }
}

function draw()
{
  var currentRectangle = new Rectangle(x, y, color, size);
  socketSendString({type:'rectdata', data: currentRectangle});
}