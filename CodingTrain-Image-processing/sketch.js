"use strict";

var frog;

function setup() {
  // Set the title of the html page here
  var myTitle = 'Loading Frog.js'
  $("#headTitle").text(myTitle);

  // create canvas
  var sizeCanvasX = 474;
  var sizeCanvasY = 315;
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

  $('.control-panel').append($("<div />",{id: "btntwo", "class":"btnDisplay"}))
  $('#btntwo').text('Button Two');
  $('#btntwo').click(function(){ alertAlert('Hello Alert World')});

  reset();
}

function reset(){
  //put code here to reset the script.  Should be the same code to start the application
  pixelDensity(1);
  frog = loadImage("frog.jfif")
  // frameRate(1);
  }

function alertAlert(messageString){
  window.alert(messageString)
}

function draw() {
  background(51);

  // put drawing code here
  //  image(frog, 0,0);

  //create an image
  var myImg = createImage(474,315);
  myImg.loadPixels();
  frog.loadPixels();

  // loadPixels();

  //loop through the pixels of the frog
  var x = 0;
  var y = 0;
  var val = 0;
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      var loc = (x + (y * width))*4;
      // val = random(200);
      
      // val = 0;
      // pixels[loc+0] = modPixel(frog.pixels[loc+2],val, x, y);
      // pixels[loc+1] = modPixel(frog.pixels[loc+0],val, x, y);
      // pixels[loc+2] = modPixel(frog.pixels[loc+1],val, x, y);     
      // pixels[loc+3] = 255;

      // let r,g,b;
      // r = frog.pixels[loc];
      // if (r > mouseX) {
      //     myImg.pixels[loc+0] = 255;
      //     myImg.pixels[loc+1] = 255;
      //     myImg.pixels[loc+2] = 255;
      //     myImg.pixels[loc+3] = 255;
      // } else {
      //   myImg.pixels[loc+0] = 0;
      //   myImg.pixels[loc+1] = 0;
      //   myImg.pixels[loc+2] = 0;
      //   myImg.pixels[loc+3] = 255;
      // }

      myImg.pixels[loc+0] = frog.pixels[loc+0]
      myImg.pixels[loc+1] = frog.pixels[loc+1]
      myImg.pixels[loc+2] = frog.pixels[loc+2]
      myImg.pixels[loc+3] = frog.pixels[loc+3]
    }
  }
  myImg.updatePixels();
  rotate(PI/-10);
  image(myImg,0,0);
  // updatePixels();
}

function modPixel(pix,val, x, y){
  // return pix / random(1.1);
  // return pix+val;
  // return pix + mouseX;

  var d = dist(mouseX, mouseY, x, y);
  var factor = map(d, 0 , 100, 2,-1);
  return pix * factor;
  // return 100;
}

// function mousePressed() {
//   if (mouseButton === LEFT){
//     if (newTimer.overTimer()) {
//     newTimer.setMouseOffset(mouseX, mouseY);
//     }
//   }
// }
// function mouseDragged() {
//   if (newTimer.overTimer()) {
//     newTimer.setCoord(mouseX, mouseY);
//   }
// }