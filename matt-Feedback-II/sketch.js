"use strict";

// I want to recreate the feedback loop effect of pointing an analog video camera into the monitor.
// start with imageStored
// manipulate the imageDisplayed and then display it.

// Variables
  // Image filters
// 1  )  Feedback Random Colored Zooming in 
// 1_1)  *Feedback Random Colored slow Zooming in, lasts long
// 1_1_1)  Feedback Random Colored Zooming in, goes on for a long time
// 1_1_1_1)  Feedback Random Colored Zooming in, for ever, perlin zoom 
// 1_2)  Feedback Random Colored Zooming in 
// 2  )  fast flashing red zoom in
// 2_1)  fast flashing red zoom in
// 2_2)  slow turning zoom in
// 3  )  slow rotating multicolored ball
// 4  )  turning Red Sun
// 4_1)  slow turning Red Sun with some alpha
// 5  )  trying perlin noise, not working

// 1=yes, 0=no
// the setting function
var setObj;
var arrayImages = [];

var filterStoredImage;
var imageStored;
var imageDisplayed;
var imageCaptured;
// starting value for the perlin noise function
var pS = 0;
var sizeCanvasX = 0;
var sizeCanvasY = 0;
var midCanvasX;
var midCanvasY = sizeCanvasY / 2;
var pixelFactorFunc;
var pixelFunc;
var redFunc;
var greenFunc;
var blueFunc;
var alphaFunc;
var zoomPercent;
var rotateAngle;


function setup() {
  // Set the title of the html page here
  var myTitle = 'Feedback Loop 1'
  $("#headTitle").text(myTitle);
  // initialize variables
  setObj = new set_0();
  // create canvas
  console.log('Canvas Size: ' + str(sizeCanvasX));
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
  // add any images that may be used to the arrayImages
  arrayImages[1] = loadImage("frog.jfif");
  arrayImages[2] = loadImage("grid.jpg");
  imageStored = createImage(sizeCanvasX,sizeCanvasY); 
  imageDisplayed = createImage(sizeCanvasX,sizeCanvasY);
}

function reset(){
  //put code here to reset the script.  Should be the same code to start the application
  // build the initial image
  setObj.initImage();
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
  
  imageDisplayed = imageStored.get(0,0,sizeCanvasX-1,sizeCanvasY-1);
  push();
  filterStoredImage();
  pop();
  push();
  // if (mouseIsPressed) {
  //   //rect(mouseX,mouseY,10,10);
  //   stroke(mouseX/2);
  //   fill(mouseX/2);
  //     rectMode(CENTER);
  //   rect(200,200,sizeCanvasX,sizeCanvasY);
  // }
  pop();
  //imageMode(CORNER);
  imageStored = get(0,0,sizeCanvasX-1,sizeCanvasY-1);

}

function NoFilter(){
  var zoomX = sizeCanvasX + (sizeCanvasX * zoomPercent);
  var zoomY = sizeCanvasY + (sizeCanvasY * zoomPercent);
  //imageDisplayed.loadPixels();

  translate(midCanvasX, midCanvasY);
  rotate(radians(rotateAngle));

  imageMode(CENTER);
  image(imageDisplayed,0,0,zoomX-1, zoomY-1);
}


function filterStoredImageBasic(){
  var zoomX = sizeCanvasX + (sizeCanvasX * zoomPercent);
  var zoomY = sizeCanvasY + (sizeCanvasY * zoomPercent);
  imageDisplayed.loadPixels();

  translate(midCanvasX, midCanvasY);
  rotate(radians(rotateAngle));

  var x = 0;
  var y = 0;
  // We will map the x to a new x
  // start at an offset
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      var locS = (x + (y * width))*4;
      var pixelVal = pixelFactorFunc();
      imageDisplayed.pixels[locS+0] = pixelFunc(redFunc(imageDisplayed.pixels[locS+0]),pixelVal);
      imageDisplayed.pixels[locS+1] = pixelFunc(greenFunc(imageDisplayed.pixels[locS+1]),pixelVal);
      imageDisplayed.pixels[locS+2] = pixelFunc(blueFunc(imageDisplayed.pixels[locS+2]),pixelVal);
      imageDisplayed.pixels[locS+3] = alphaFunc(imageDisplayed.pixels[locS+3]);
    }
  }
  imageDisplayed.updatePixels();

  imageMode(CENTER);
  image(imageDisplayed,0,0,zoomX, zoomY);
}

class set_0  {
  constructor (){
    sizeCanvasX = 500;
    sizeCanvasY = 500;
    midCanvasX = (sizeCanvasX-1) / 2;
    midCanvasY = (sizeCanvasY-1) / 2;
    zoomPercent = 0;
    rotateAngle = 0;
    // pixelFactorFunc = function (a) {return a};
    // pixelFunc = function (a) {return a};
    // redFunc = function (a) {return a * random(2)};
    // greenFunc = redFunc;
    // blueFunc = redFunc;
    // alphaFunc = function(a) {return 255};
    filterStoredImage = NoFilter;
  }
 initImage (){
    // load from arrayImages an image or draw to the canvas and get the full canvas
    imageStored = arrayImages[2];  
    //  background(200);
    //  imageStored = get();
    }
}


class set_1  {
  constructor (){
    sizeCanvasX = 400;
    sizeCanvasY = 400;
    midCanvasX = sizeCanvasX / 2;
    midCanvasY = sizeCanvasY / 2;
    zoomPercent = 0.0075;
    rotateAngle = 0.5;
    pixelFactorFunc = function (a) {return a};
    pixelFunc = function (a) {return a};
    redFunc = function (a) {return a * random(2)};
    greenFunc = redFunc;
    blueFunc = redFunc;
    alphaFunc = function(a) {return 255};
    filterStoredImage = filterStoredImageBasic;
  }
 initImage (){
    // load from arrayImages an image or draw to the canvas and get the full canvas
    // imageStored = arrayImages[1];  
      background(200);
      imageStored = get();
    }
}

class set_2  {
  constructor (){
    sizeCanvasX = 400;
    sizeCanvasY = 400;
    midCanvasX = sizeCanvasX / 2;
    midCanvasY = sizeCanvasY / 2;
    zoomPercent = 0.0075;
    rotateAngle = 0.5;
    pixelFactorFunc = function() {return 1};
    pixelFunc = function (c,d) {return (c * d) };
    redFunc = function (e) {return e * (random(1)+.503) };
    greenFunc = redFunc;
    blueFunc = redFunc;
    alphaFunc = function(a) {return 255};
    filterStoredImage = filterStoredImageBasic;
  }
 initImage (){
    // load from arrayImages an image or draw to the canvas and get the full canvas
    // imageStored = arrayImages[1];  
      background(100);
      imageStored = get();
    }
  test () {
    console.log ('PixelFactorFunc: ' + pixelFactorFunc());
    var pixelVal = pixelFactorFunc();
    console.log('PixelFunc: ' + pixelFunc(100,pixelVal))
    //console.log('Red Value: ' + redFunc(100));
    console.log('Pixel Value Red: ' + pixelFunc(redFunc(100),pixelVal));
  }
}

// 3)  Feedback Random Colored Zooming in 
// goes on for a long time
class set_3  {
  constructor (){
    sizeCanvasX = 400;
    sizeCanvasY = 400;
    midCanvasX = sizeCanvasX / 2;
    midCanvasY = sizeCanvasY / 2;
    zoomPercent = 0.05;
    rotateAngle = 0;
    pixelFactorFunc = function(a) {return 1};
    pixelFunc = function (a,b) {return a*b };
    redFunc = function (a) {
      if(a < 20) { 
        return random(100);}
      else {
        return a * (random(1)+.503);
      }
    };
    greenFunc = function (a) {
      if(a < 15) { 
        return random(100);}
      else {
        return a * (random(1)+.503);
      }
    };
    blueFunc = redFunc;
    alphaFunc = function(a) {return 255};
    filterStoredImage = filterStoredImageBasic;
  }
 initImage (){
    // load from arrayImages an image or draw to the canvas and get the full canvas
    // imageStored = arrayImages[1];  
      background(100);
      imageStored = get();
    }
}

// Perlin noise zoom not functional yet
// 1_1_1_1)  Feedback Random Colored Zooming in 
// goes on for a long time
// have added random generation when get's too dark so it will go on for ever
// have added perlin noise to the zoom factor.  Can be a bit unsettling
class set_4  {
  constructor (){
    sizeCanvasX = 400;
    sizeCanvasY = 400;
    midCanvasX = sizeCanvasX / 2;
    midCanvasY = sizeCanvasY / 2;
    zoomPercent = 0.05;
    rotateAngle = 0;
    pixelFactorFunc = function(a) {return 1};
    pixelFunc = function (a,b) {return a*b };
    redFunc = function (a) {
      if(a < 20) { 
        return random(100);}
      else {
        return a * (random(1)+.503);
      }
    };
    greenFunc = function (a) {
      if(a < 15) { 
        return random(100);}
      else {
        return a * (random(1)+.503);
      }
    };
    blueFunc = redFunc;
    alphaFunc = function(a) {return 255};
    filterStoredImage = filterStoredImageBasic;
  }
 initImage (){
    // load from arrayImages an image or draw to the canvas and get the full canvas
    // imageStored = arrayImages[1];  
      background(100);
      imageStored = get();
    }
}

// 1_1_2)  Gray scale Feedback Random Colored Zooming in 
// goes on for a long time
class set_5  {
  constructor (){
    sizeCanvasX = 400;
    sizeCanvasY = 400;
    midCanvasX = sizeCanvasX / 2;
    midCanvasY = sizeCanvasY / 2;
    zoomPercent = 0.001;
    rotateAngle = 0.05;
    pixelFactorFunc = function(a) {return  (random(.5)+.7515)};
    pixelFunc = function (a,b) {return a*b };
    redFunc = function (a) { return a};
    greenFunc = redFunc;
    blueFunc = redFunc;
    alphaFunc = function(a) {return 255};
    filterStoredImage = filterStoredImageBasic;
  }
 initImage (){
    // load from arrayImages an image or draw to the canvas and get the full canvas
    // imageStored = arrayImages[1];  
      background(100);
      imageStored = get();
    }
}

// 1_1_3)  Feedback Random Colored Zooming in 
// goes on for a long time
class set_6  {
  constructor (){
    sizeCanvasX = 400;
    sizeCanvasY = 400;
    midCanvasX = sizeCanvasX / 2;
    midCanvasY = sizeCanvasY / 2;
    zoomPercent = 0.001;
    rotateAngle = 0.05;
    pixelFactorFunc = function(a) {return 1};
    pixelFunc = function (a,b) {return a*b };
    redFunc = function (a) { return a * (random(.5)+.7515)};
    greenFunc = redFunc;
    blueFunc = redFunc;
    alphaFunc = function(a) {return 255};
    filterStoredImage = filterStoredImageBasic;
  }
 initImage (){
    // load from arrayImages an image or draw to the canvas and get the full canvas
    // imageStored = arrayImages[1];  
      background(100);
      imageStored = get();
    }
}

// 1_1_4)  Feedback Random Colored Zooming in 
// goes on for a long time
// works well with starting background color of 100 instead of 51
class set_7  {
  constructor (){
    sizeCanvasX = 600;
    sizeCanvasY = 400;
    midCanvasX = sizeCanvasX / 2;
    midCanvasY = sizeCanvasY / 2;
    zoomPercent = 0.001;
    rotateAngle = 0.05;
    pixelFactorFunc = function(a) {return random(-10,10)};
    pixelFunc = function (a,b) {return a+b };
    redFunc = function (a) { return a * (random(.25)+.8764)};
    greenFunc = redFunc;
    blueFunc = redFunc;
    alphaFunc = function(a) {return 255};
    filterStoredImage = filterStoredImageBasic;
  }
 initImage (){
    // load from arrayImages an image or draw to the canvas and get the full canvas
    // imageStored = arrayImages[1];  
      background(100);
      imageStored = get();
    }
}

// 1_1_5)  Feedback Random Colored Zooming in 
// goes on for a long time
// affecting the relative amounts of the numbers added tot he random numbers below will affect which color it tends to.
// increase red and green and decrease blue and you will get yellow.
class set_8  {
  constructor (){
    sizeCanvasX = 400;
    sizeCanvasY = 400;
    midCanvasX = sizeCanvasX / 2;
    midCanvasY = sizeCanvasY / 2;
    zoomPercent = 0;
    rotateAngle = 0;
    pixelFactorFunc = function(a) {return a};
    pixelFunc = function (a,b) {return a };
    redFunc = function (a) { return a * (random(.12)+.9415)};
    greenFunc = function (a) { return a * (random(.12)+.9415)};
    blueFunc = function (a) { return a * (random(.12)+.9405)};
    alphaFunc = function(a) {return 255};
    filterStoredImage = filterStoredImageBasic;
  }
 initImage (){
    // load from arrayImages an image or draw to the canvas and get the full canvas
    // imageStored = arrayImages[1];  
      background(100);
      imageStored = get();
    }
}

// Feedback Random Colored pastel Zooming in 
// goes on for a long time
// uses alpha 100 resulting in pastell like colors
class set_9  {
  constructor (){
    sizeCanvasX = 400;
    sizeCanvasY = 400;
    midCanvasX = sizeCanvasX / 2;
    midCanvasY = sizeCanvasY / 2;
    zoomPercent = .0075;
    rotateAngle = -0.9;
    pixelFactorFunc = function(a) {return a};
    pixelFunc = function (a,b) {return a };
    redFunc = function (a) { return a * (random(1)+0.503)};
    greenFunc = redFunc;
    blueFunc = redFunc;
    alphaFunc = function(a) {return 100};
    filterStoredImage = filterStoredImageBasic;
  }
 initImage (){
    // load from arrayImages an image or draw to the canvas and get the full canvas
    // imageStored = arrayImages[1];  
      background(100);
      imageStored = get();
    }
}

//fast flashing red 
class set_10  {
  constructor (){
    sizeCanvasX = 400;
    sizeCanvasY = 400;
    midCanvasX = sizeCanvasX / 2;
    midCanvasY = sizeCanvasY / 2;
    zoomPercent = 0;
    rotateAngle = 270;
    pixelFactorFunc = function(a) {return a};
    pixelFunc = function (a,b) {return a };
    redFunc = function (a) { return a * (random(1)+0.503)};
    greenFunc = function(a) { return 0};
    blueFunc = greenFunc;
    alphaFunc = function(a) {return 255};
    filterStoredImage = filterStoredImageBasic;
  }
 initImage (){
    // load from arrayImages an image or draw to the canvas and get the full canvas
    // imageStored = arrayImages[1];  
      background(100);
      imageStored = get();
    }
}

//fast flashing red zoom in
class set_11  {
  constructor (){
    sizeCanvasX = 400;
    sizeCanvasY = 400;
    midCanvasX = sizeCanvasX / 2;
    midCanvasY = sizeCanvasY / 2;
    zoomPercent = .025;
    rotateAngle = 270;
    pixelFactorFunc = function(a) {return a};
    pixelFunc = function (a,b) {return a };
    redFunc = function (a) { return a * (random(1)+0.503)};
    greenFunc = function(a) { return 0};
    blueFunc = greenFunc;
    alphaFunc = function(a) {return 255};
    filterStoredImage = filterStoredImageBasic;
  }
 initImage (){
    // load from arrayImages an image or draw to the canvas and get the full canvas
    // imageStored = arrayImages[1];  
      background(100);
      imageStored = get();
    }
}

//slow turning zoom in
class set_12  {
  constructor (){
    sizeCanvasX = 400;
    sizeCanvasY = 400;
    midCanvasX = sizeCanvasX / 2;
    midCanvasY = sizeCanvasY / 2;
    zoomPercent = .00125;
    rotateAngle = 0.05;
    pixelFactorFunc = function(a) {return a};
    pixelFunc = function (a,b) {return a };
    redFunc = function (a) { return a * (random(1)+0.503)};
    greenFunc = function(a) { return 0};
    blueFunc = greenFunc;
    alphaFunc = function(a) {return 255};
    filterStoredImage = filterStoredImageBasic;
  }
 initImage (){
    // load from arrayImages an image or draw to the canvas and get the full canvas
    // imageStored = arrayImages[1];  
      background(100);
      imageStored = get();
    }
}

// slow rotating multicolored ball
class set_13  {
  constructor (){
    sizeCanvasX = 400;
    sizeCanvasY = 400;
    midCanvasX = sizeCanvasX / 2;
    midCanvasY = sizeCanvasY / 2;
    zoomPercent = .00125;
    rotateAngle = .3;
    pixelFactorFunc = function(a) {return a};
    pixelFunc = function (a,b) {return a };
    redFunc = function (a) { return a + (random(-50,50))};
    greenFunc = redFunc
    blueFunc = greenFunc;
    alphaFunc = function(a) {return 255};
    filterStoredImage = filterStoredImageBasic;
  }
 initImage (){
    // load from arrayImages an image or draw to the canvas and get the full canvas
    // imageStored = arrayImages[1];  
      background(100);
      imageStored = get();
    }
}

// turning Red Sun
class set_14  {
  constructor (){
    sizeCanvasX = 400;
    sizeCanvasY = 400;
    midCanvasX = sizeCanvasX / 2;
    midCanvasY = sizeCanvasY / 2;
    zoomPercent = .00125;
    rotateAngle = .4;
    pixelFactorFunc = function(a) {return random(-41.5,40)};
    pixelFunc = function (a,b) {return a + b };
    redFunc = function (a) { return a + 2};
    greenFunc = function (a) { return a + 1};
    blueFunc = function (a) { return a - 1};
    alphaFunc = function(a) {return 240};
    filterStoredImage = filterStoredImageBasic;
  }
 initImage (){
    // load from arrayImages an image or draw to the canvas and get the full canvas
    // imageStored = arrayImages[1];  
      background(100);
      imageStored = get();
    }
}

// turning Red Sun 2
class set_15  {
  constructor (){
    sizeCanvasX = 400;
    sizeCanvasY = 400;
    midCanvasX = sizeCanvasX / 2;
    midCanvasY = sizeCanvasY / 2;
    zoomPercent = .00125;
    rotateAngle = 1;
    pixelFactorFunc = function(a) {return random(-42.0,40)};
    pixelFunc = function (a,b) {return a + b };
    redFunc = function (a) { return a + 2};
    greenFunc = function (a) { return a + 1.5};
    blueFunc = function (a) { return a };
    alphaFunc = function(a) {return 240};
    filterStoredImage = filterStoredImageBasic;
  }
 initImage (){
    // load from arrayImages an image or draw to the canvas and get the full canvas
    // imageStored = arrayImages[1];  
      background(100);
      imageStored = get();
    }
}

