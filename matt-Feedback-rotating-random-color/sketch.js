"use strict";

// I want to recreate the feedback loop effect of pointing an analog video camera into the monitor.
// start with imageStored
// manipulate the imageDisplayed and then display it.

// what recreates some sort of 

var imageStored;
var imageDisplayed;
var imageCaptured;
var prl=0; // for perlin noise
var sizeX = 400;
var sizeY = 400;
var sizeCanvasX =  500;
var sizeCanvasY = 500;

function setup() {
  // Set the title of the html page here
  var myTitle = 'Feedback Loop 1'
  $("#headTitle").text(myTitle);

  // create canvas
  var myCanvas = createCanvas(sizeCanvasX, sizeCanvasY);

  // set the html dom parent
  myCanvas.parent('sketch-holder');
  // setup the controll panel
  //$('.control-panel').text(myTitle);
  // adjust the size of the elements to match the canvas size set above
  $('.control-panel').css("height",sizeCanvasY);
  $('.display-canvas').css("height",sizeCanvasY);
  $('.display-canvas').css("width",sizeCanvasX);
  
  // add control buttons
  $('.control-panel').append($("<div />",{id: "btnReset", "class":"btnButton"}))
  $('#btnReset').text('Reset');
  // reset by calling setup function
  $('#btnReset').click(reset);

  reset();
}
// Load any images that need to be used at the start of the sketch
// loadImage is async and if you load an image in setup it won't be done loading if
// you need to use it immediately.

function preload(){
  imageStored = createImage(sizeCanvasX, sizeCanvasY);
  imageDisplayed = createImage(sizeCanvasX, sizeCanvasY);
  imageCaptured = createImage(sizeCanvasX, sizeCanvasY);

}

function reset(){
  //put code here to reset the script.  Should be the same code to start the application
  // build the initial image
  background(51);
  initialImage();
  // frameRate(24);
}

function draw() {
  // put drawing code here
  // filter the initial image

  // draw a rectangle around edge of image
  fill(0,0);
  stroke(0,255);
  strokeWeight(3);
  //rect(2,2,396,396);
  // get part of the canvas
  
//  imageDisplayed = imageStored.get(1,1,398,398);
  imageDisplayed = imageStored.get(0,0,sizeCanvasX, sizeCanvasY);
  //imageDisplayed = imageStored.get(25,25,350,350);
  push();
  // a is modified using perlin noise.
  var a = map(noise(prl), 0, 1, -2,2);

  // To show movement you can alter the formula as follows
  // move left
  //translate(sizeCanvasX/2+1,sizeCanvasY/2);
  // move right
  //translate(sizeCanvasX/2-1,sizeCanvasY/2);
  // perlin movement
  //translate(sizeCanvasX/2+(a*10),sizeCanvasY/2+(a*10));
  //no movement
  translate(sizeCanvasX/2,sizeCanvasY/2);
  //var a = noise(prl);
   //console.log(a);
  //rotate(radians(a));
  prl += 0.1;
  //filterStoredImageBlue();
  filterStoredImageRed();
  //filterStoredImageGreen();
  imageMode(CENTER);
  image(imageDisplayed,0,0,sizeCanvasX,sizeCanvasY);
  pop();
  push();
  if (mouseIsPressed) {
    stroke(mouseX/2);
    fill(mouseX/2);
      rectMode(CENTER);
    rect(mouseX,mouseY,50,50);
  }
  pop();
  //imageMode(CORNER);
  imageStored = get(0,0,sizeCanvasX, sizeCanvasY);

}


function initialImage() {

  // capture the initial image
  //imageStored = get();
  //imageStored = loadImage("frog.jfif");

}

function filterStoredImage() {
  imageDisplayed.loadPixels();
 
  var x = 0;
  var y = 0;
  // We will map the x to a new x
  // start at an offset
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      var locS = (x + (y * width))*4;
      imageDisplayed.pixels[locS+0] = imageDisplayed.pixels[locS+0]* random(2);
      imageDisplayed.pixels[locS+1] = imageDisplayed.pixels[locS+1]* random(2);
      imageDisplayed.pixels[locS+2] = imageDisplayed.pixels[locS+2]* random(2);
      imageDisplayed.pixels[locS+3] = imageDisplayed.pixels[locS+3];
    }
  }
  imageDisplayed.updatePixels();
}

function filterStoredImageRed() {
  imageDisplayed.loadPixels();
 
  var x = 0;
  var y = 0;
  var P = 50;
  var N = -50;
  // We will map the x to a new x
  // start at an offset
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      var locS = (x + (y * width))*4;
      imageDisplayed.pixels[locS+0] = imageDisplayed.pixels[locS+0]+ random(N,P);
      imageDisplayed.pixels[locS+1] = 0 //imageDisplayed.pixels[locS+1];
      imageDisplayed.pixels[locS+2] = 0 // imageDisplayed.pixels[locS+2];
      imageDisplayed.pixels[locS+3] = 255 //imageDisplayed.pixels[locS+3];
    }
  }
  imageDisplayed.updatePixels();
}
function filterStoredImageGreen() {
  imageDisplayed.loadPixels();
 
  var x = 0;
  var y = 0;
  var P = 50;
  var N = -50;
  // We will map the x to a new x
  // start at an offset
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      var locS = (x + (y * width))*4;
      imageDisplayed.pixels[locS+0] = 0//imageDisplayed.pixels[locS+0]+ random(N,P);
      imageDisplayed.pixels[locS+1] = imageDisplayed.pixels[locS+1]+ random(N,P);
      imageDisplayed.pixels[locS+2] = 0 // imageDisplayed.pixels[locS+2];
      imageDisplayed.pixels[locS+3] = 255 //imageDisplayed.pixels[locS+3];
    }
  }
  imageDisplayed.updatePixels();
}
function filterStoredImageBlue() {
  imageDisplayed.loadPixels();
 
  var x = 0;
  var y = 0;
  var P = 40.5;
  var N = -40;
  // We will map the x to a new x
  // start at an offset
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      var locS = (x + (y * width))*4;
      imageDisplayed.pixels[locS+0] = 0
      imageDisplayed.pixels[locS+1] = 0
      imageDisplayed.pixels[locS+2] = imageDisplayed.pixels[locS+2]+ random(N,P);
      imageDisplayed.pixels[locS+3] = 255 //imageDisplayed.pixels[locS+3];
    }
  }
  imageDisplayed.updatePixels();
}

function filterStoredImage3() {
  imageDisplayed.loadPixels();
 
  var x = 0;
  var y = 0;
  var P = 50;
  var N = -50;
  // We will map the x to a new x
  // start at an offset
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      var locS = (x + (y * width))*4;
      imageDisplayed.pixels[locS+0] = imageDisplayed.pixels[locS+0] + random(N,P);
      imageDisplayed.pixels[locS+1] = imageDisplayed.pixels[locS+1] + random(N,P);
      imageDisplayed.pixels[locS+2] = imageDisplayed.pixels[locS+2] + random(N,P);
      imageDisplayed.pixels[locS+3] = imageDisplayed.pixels[locS+3];
    }
  }
  imageDisplayed.updatePixels();
}
