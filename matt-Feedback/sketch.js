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
var startImageYes = 0;
// Change this variable statement to define which image filter will be used.
var filterStoredImage = filterStoredImage1_1_1_1;
var imageStored;
var imageDisplayed;
var imageCaptured;
// starting value for the perlin noise function
var pS = 0;
var sizeCanvasX = 400;
var sizeCanvasY = 400;
var midCanvasX = sizeCanvasX / 2;
var midCanvasY = sizeCanvasY / 2;

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
  if (startImageYes === 1){
    imageStored = loadImage("frog.jfif");
  } else {
  imageStored = createImage(sizeCanvasX,sizeCanvasY);
  }
  
  imageDisplayed = createImage(sizeCanvasX,sizeCanvasY);
  imageCaptured = createImage(sizeCanvasX,sizeCanvasY);
}

function reset(){
  //put code here to reset the script.  Should be the same code to start the application
  // build the initial image
  background(100);
  initialImage();
  //frameRate(10);
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
  
  imageDisplayed = imageStored.get(0,0,sizeCanvasX,sizeCanvasY);
  //imageDisplayed = imageStored.get(25,25,350,350);
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
  imageStored = get(0,0,sizeCanvasX,sizeCanvasY);

}


function initialImage() {

  // capture the initial image if imageStartYes = 1
  // else it's already been loaded in preload.
  if (startImageYes === 0) {
    imageStored = get();
  }
  



}

// 1) Feedback Random Colored Zooming in 
function filterStoredImage1() {
  // difference from canvas size will affect zoom
  // over to zoom in, under to zoom out
  var zoom = sizeCanvasX + 3;
  imageDisplayed.loadPixels();

  translate(midCanvasX, midCanvasY);
  rotate(radians(.5));
 
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
  // you can zoom in or out based upon the size of the image you display
  imageMode(CENTER);
  image(imageDisplayed,0,0,zoom, zoom);

}

// 1_1)  Feedback Random Colored Zooming in 
// goes on for a long time
function filterStoredImage1_1() {
  // difference from canvas size will affect zoom
  // over to zoom in, under to zoom out
  var zoom = sizeCanvasX + 3;
  imageDisplayed.loadPixels();

  translate(midCanvasX, midCanvasY);
  rotate(radians(.5));
 
  var x = 0;
  var y = 0;
  // We will map the x to a new x
  // start at an offset
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      var locS = (x + (y * width))*4;
      imageDisplayed.pixels[locS+0] = imageDisplayed.pixels[locS+0]* (random(1)+.503);
      imageDisplayed.pixels[locS+1] = imageDisplayed.pixels[locS+1]* (random(1)+.503);
      imageDisplayed.pixels[locS+2] = imageDisplayed.pixels[locS+2]* (random(1)+.503);
      imageDisplayed.pixels[locS+3] = imageDisplayed.pixels[locS+3];
    }
  }
  imageDisplayed.updatePixels();
  // you can zoom in or out based upon the size of the image you display
  imageMode(CENTER);
  image(imageDisplayed,0,0,zoom, zoom);

}

// 1_1_1)  Feedback Random Colored Zooming in 
// goes on for a long time
function filterStoredImage1_1_1() {
  // difference from canvas size will affect zoom
  // over to zoom in, under to zoom out
  var zoom = sizeCanvasX + (sizeCanvasX * 0.05);
  //var zoom = sizeCanvasX;
  imageDisplayed.loadPixels();

  translate(midCanvasX, midCanvasY);
  //rotate(radians(.5));
 
  var x = 0;
  var y = 0;
  // We will map the x to a new x
  // start at an offset
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      var locS = (x + (y * width))*4;
      if(imageDisplayed.pixels[locS+0] < 20) { 
        imageDisplayed.pixels[locS+0] = random(100);}
      else {
        imageDisplayed.pixels[locS+0] = imageDisplayed.pixels[locS+0]* (random(1)+.503);
      }
      if(imageDisplayed.pixels[locS+1] < 15) { 
        imageDisplayed.pixels[locS+1] = random(100);}
      else {
        imageDisplayed.pixels[locS+1] = imageDisplayed.pixels[locS+1]* (random(1)+.503);
      }
      if(imageDisplayed.pixels[locS+2] < 20) { 
        imageDisplayed.pixels[locS+2] = random(100);}
      else {
        imageDisplayed.pixels[locS+2] = imageDisplayed.pixels[locS+2]* (random(1)+.503);
      }
      
      imageDisplayed.pixels[locS+3] = 255

      // if(imageDisplayed.pixels[locS+3] < 20) { 
      //   imageDisplayed.pixels[locS+3] = random(255);}
      // else {
      //   imageDisplayed.pixels[locS+3] = imageDisplayed.pixels[locS+3]* (random(1)+.50);
      // }


      // imageDisplayed.pixels[locS+1] = imageDisplayed.pixels[locS+1]* (random(1)+.50);
      // imageDisplayed.pixels[locS+2] = imageDisplayed.pixels[locS+2]* (random(1)+.50);
      // imageDisplayed.pixels[locS+3] = imageDisplayed.pixels[locS+3];
    }
  }
  imageDisplayed.updatePixels();
  // you can zoom in or out based upon the size of the image you display
  imageMode(CENTER);
  image(imageDisplayed,0,0,zoom, zoom);

}

// 1_1_1_1)  Feedback Random Colored Zooming in 
// goes on for a long time
// have added random generation when get's too dark so it will go on for ever
// have added perlin noise to the zoom factor.  Can be a bit unsettling
function filterStoredImage1_1_1_1() {
  // difference from canvas size will affect zoom
  // over to zoom in, under to zoom out
  
  //use perlin noise for the zoom factor
  var f = ((noise(pS) * 0.06));
  console.log(f)
  var zoom = sizeCanvasX + (sizeCanvasX * f);
  pS += .03
  //var zoom = sizeCanvasX;
  imageDisplayed.loadPixels();

  translate(midCanvasX, midCanvasY);
  //rotate(radians(.5));
 
  var x = 0;
  var y = 0;
  // We will map the x to a new x
  // start at an offset
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      var locS = (x + (y * width))*4;
      if(imageDisplayed.pixels[locS+0] < 20) { 
        imageDisplayed.pixels[locS+0] = random(100);}
      else {
        imageDisplayed.pixels[locS+0] = imageDisplayed.pixels[locS+0]* (random(1)+.503);
      }
      if(imageDisplayed.pixels[locS+1] < 15) { 
        imageDisplayed.pixels[locS+1] = random(100);}
      else {
        imageDisplayed.pixels[locS+1] = imageDisplayed.pixels[locS+1]* (random(1)+.503);
      }
      if(imageDisplayed.pixels[locS+2] < 20) { 
        imageDisplayed.pixels[locS+2] = random(100);}
      else {
        imageDisplayed.pixels[locS+2] = imageDisplayed.pixels[locS+2]* (random(1)+.503);
      }
      
      imageDisplayed.pixels[locS+3] = 255

      // if(imageDisplayed.pixels[locS+3] < 20) { 
      //   imageDisplayed.pixels[locS+3] = random(255);}
      // else {
      //   imageDisplayed.pixels[locS+3] = imageDisplayed.pixels[locS+3]* (random(1)+.50);
      // }


      // imageDisplayed.pixels[locS+1] = imageDisplayed.pixels[locS+1]* (random(1)+.50);
      // imageDisplayed.pixels[locS+2] = imageDisplayed.pixels[locS+2]* (random(1)+.50);
      // imageDisplayed.pixels[locS+3] = imageDisplayed.pixels[locS+3];
    }
  }
  imageDisplayed.updatePixels();
  // you can zoom in or out based upon the size of the image you display
  imageMode(CENTER);
  image(imageDisplayed,0,0,zoom, zoom);

}


// 1_1_2)  Gray scale Feedback Random Colored Zooming in 
// goes on for a long time
function filterStoredImage1_1_2() {
  // difference from canvas size will affect zoom
  // over to zoom in, under to zoom out
  var zoom = sizeCanvasX + (sizeCanvasX * .001);
  imageDisplayed.loadPixels();

  translate(midCanvasX, midCanvasY);
  rotate(radians(.05));
 
  var x = 0;
  var y = 0;
  // We will map the x to a new x
  // start at an offset
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      var locS = (x + (y * width))*4;
      var val = (random(.5)+.7515)
      imageDisplayed.pixels[locS+0] = imageDisplayed.pixels[locS+0]* val ;
      imageDisplayed.pixels[locS+1] = imageDisplayed.pixels[locS+1]* val;
      imageDisplayed.pixels[locS+2] = imageDisplayed.pixels[locS+2]* val;
      imageDisplayed.pixels[locS+3] = 100  // imageDisplayed.pixels[locS+3];
    }
  }
  imageDisplayed.updatePixels();
  // you can zoom in or out based upon the size of the image you display
  imageMode(CENTER);
  image(imageDisplayed,0,0,zoom, zoom);

}

// 1_1_3)  Feedback Random Colored Zooming in 
// goes on for a long time
function filterStoredImage1_1_3() {
  // difference from canvas size will affect zoom
  // over to zoom in, under to zoom out
  var zoom = sizeCanvasX + (sizeCanvasX * .001);
  imageDisplayed.loadPixels();

  translate(midCanvasX, midCanvasY);
  rotate(radians(.05));
 
  var x = 0;
  var y = 0;
  // We will map the x to a new x
  // start at an offset
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      var locS = (x + (y * width))*4;
      imageDisplayed.pixels[locS+0] = imageDisplayed.pixels[locS+0]* (random(.5)+.7515);
      imageDisplayed.pixels[locS+1] = imageDisplayed.pixels[locS+1]* (random(.5)+.7515);
      imageDisplayed.pixels[locS+2] = imageDisplayed.pixels[locS+2]* (random(.5)+.7515);
      imageDisplayed.pixels[locS+3] = imageDisplayed.pixels[locS+3];
    }
  }
  imageDisplayed.updatePixels();
  // you can zoom in or out based upon the size of the image you display
  imageMode(CENTER);
  image(imageDisplayed,0,0,zoom, zoom);

}

// 1_1_4)  Feedback Random Colored Zooming in 
// goes on for a long time
// works well with starting background color of 100 instead of 51
function filterStoredImage1_1_4() {
  // difference from canvas size will affect zoom
  // over to zoom in, under to zoom out
  var zoom = sizeCanvasX + (sizeCanvasX * .01);
  imageDisplayed.loadPixels();

  translate(midCanvasX, midCanvasY);
  rotate(radians(.5));
 
  var x = 0;
  var y = 0;
  // We will map the x to a new x
  // start at an offset
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      var locS = (x + (y * width))*4;
      // want a negative to positive range
      var brightness = random(-10,10);
      imageDisplayed.pixels[locS+0] = (imageDisplayed.pixels[locS+0]* (random(.25)+.8764))+ brightness;
      imageDisplayed.pixels[locS+1] = (imageDisplayed.pixels[locS+1]* (random(.25)+.8764))+ brightness;
      imageDisplayed.pixels[locS+2] = (imageDisplayed.pixels[locS+2]* (random(.25)+.8764))+ brightness;
      imageDisplayed.pixels[locS+3] = imageDisplayed.pixels[locS+3];
    }
  }
  imageDisplayed.updatePixels();
  // you can zoom in or out based upon the size of the image you display
  imageMode(CENTER);
  image(imageDisplayed,0,0,zoom, zoom);

}

// 1_1_5)  Feedback Random Colored Zooming in 
// goes on for a long time
// affecting the relative amounts of the numbers added tot he random numbers below will affect which color it tends to.
// increase red and green and decrease blue and you will get yellow.
function filterStoredImage1_1_5() {
  // difference from canvas size will affect zoom
  // over to zoom in, under to zoom out
  var zoom = sizeCanvasX + (sizeCanvasX * 0);
  imageDisplayed.loadPixels();

  translate(midCanvasX, midCanvasY);
  rotate(radians(.0));
 
  var x = 0;
  var y = 0;
  // We will map the x to a new x
  // start at an offset
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      var locS = (x + (y * width))*4;
      // want a negative to positive range
      var brightness =  0 //random(-10,10);
      imageDisplayed.pixels[locS+0] = (imageDisplayed.pixels[locS+0]* (random(.12)+.9415))+ brightness;
      imageDisplayed.pixels[locS+1] = (imageDisplayed.pixels[locS+1]* (random(.12)+.9415))+ brightness;
      imageDisplayed.pixels[locS+2] = (imageDisplayed.pixels[locS+2]* (random(.12)+.9405))+ brightness;
      imageDisplayed.pixels[locS+3] = imageDisplayed.pixels[locS+3];
    }
  }
  imageDisplayed.updatePixels();
  // you can zoom in or out based upon the size of the image you display
  imageMode(CENTER);
  image(imageDisplayed,0,0,zoom, zoom);

}

// Feedback Random Colored pastel Zooming in 
// goes on for a long time
// uses alpha 100 resulting in pastell like colors
function filterStoredImage1_2() {
  // difference from canvas size will affect zoom
  // over to zoom in, under to zoom out
  var zoom = sizeCanvasX + 3;
  imageDisplayed.loadPixels();

  translate(midCanvasX, midCanvasY);
  rotate(radians(.5));
 
  var x = 0;
  var y = 0;
  // We will map the x to a new x
  // start at an offset
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      var locS = (x + (y * width))*4;
      imageDisplayed.pixels[locS+0] = imageDisplayed.pixels[locS+0]* (random(1)+.503);
      imageDisplayed.pixels[locS+1] = imageDisplayed.pixels[locS+1]* (random(1)+.503);
      imageDisplayed.pixels[locS+2] = imageDisplayed.pixels[locS+2]* (random(1)+.503);
      imageDisplayed.pixels[locS+3] = 100 //imageDisplayed.pixels[locS+3];
    }
  }
  imageDisplayed.updatePixels();
  // you can zoom in or out based upon the size of the image you display
  imageMode(CENTER);
  image(imageDisplayed,0,0,zoom, zoom);

}

//fast flashing red zoom in
function filterStoredImage2() {
  // difference from canvas size will affect zoom
  // over to zoom in, under to zoom out
  // assuming a square size for the canvas
  var zoom = sizeCanvasX + 0 ;
  imageDisplayed.loadPixels();


  var x = 0;
  var y = 0;
  // We will map the x to a new x
  // start at an offset
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      var locS = (x + (y * width))*4;
      imageDisplayed.pixels[locS+0] = imageDisplayed.pixels[locS+0]* (random(1)+ .503);
      imageDisplayed.pixels[locS+1] = 0 //imageDisplayed.pixels[locS+1];
      imageDisplayed.pixels[locS+2] = 0// imageDisplayed.pixels[locS+2];
      imageDisplayed.pixels[locS+3] = imageDisplayed.pixels[locS+3];
    }
  }
  imageDisplayed.updatePixels();

  translate(midCanvasX, midCanvasY);
  // if make rotation 180 get interesting flickering
  rotate(radians(125));

  // you can zoom in or out based upon the size of the image you display
  imageMode(CENTER);
  image(imageDisplayed,0,0,zoom, zoom);

}

//fast flashing red zoom in
function filterStoredImage2_1() {
  // difference from canvas size will affect zoom
  // over to zoom in, under to zoom out
  var zoom = sizeCanvasX + 10;
  imageDisplayed.loadPixels();


  var x = 0;
  var y = 0;
  // We will map the x to a new x
  // start at an offset
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      var locS = (x + (y * width))*4;
      imageDisplayed.pixels[locS+0] = imageDisplayed.pixels[locS+0]* (random(1)+ .503);
      imageDisplayed.pixels[locS+1] = 0 //imageDisplayed.pixels[locS+1];
      imageDisplayed.pixels[locS+2] = 0// imageDisplayed.pixels[locS+2];
      imageDisplayed.pixels[locS+3] = imageDisplayed.pixels[locS+3];
    }
  }
  imageDisplayed.updatePixels();
  translate(midCanvasX, midCanvasY);
  // if make rotation 180 get interesting flickering
  rotate(radians(270));

  // you can zoom in or out based upon the size of the image you display
  imageMode(CENTER);
  image(imageDisplayed,0,0,zoom, zoom);

}

//slow turning zoom in
function filterStoredImage2_2() {
  // difference from canvas size will affect zoom
  // over to zoom in, under to zoom out
  var zoom = sizeCanvasX + .5;
  imageDisplayed.loadPixels();


  var x = 0;
  var y = 0;
  // We will map the x to a new x
  // start at an offset
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      var locS = (x + (y * width))*4;
      // if (imageDisplayed.pixels[locS+0] == 0) {
      //   imageDisplayed.pixels[locS+0] = random(255)
      // } else {
      // imageDisplayed.pixels[locS+0] = imageDisplayed.pixels[locS+0] * (random(1)+ .503);
      // }
      imageDisplayed.pixels[locS+0] = imageDisplayed.pixels[locS+0] * (random(1)+ .503);
      imageDisplayed.pixels[locS+1] = 0 //imageDisplayed.pixels[locS+1];
      imageDisplayed.pixels[locS+2] = 0// imageDisplayed.pixels[locS+2];
      imageDisplayed.pixels[locS+3] = 255;
    }
  }
  imageDisplayed.updatePixels();
  translate(midCanvasX + .01, midCanvasY);
  // if make rotation 180 get interesting flickering
  rotate(radians(.05));

  // you can zoom in or out based upon the size of the image you display
  imageMode(CENTER);
  image(imageDisplayed,0,0,zoom, zoom);

}

// slow rotating multicolored ball
function filterStoredImage3() {
  // difference from canvas size will affect zoom
  // over to zoom in, under to zoom out
  var zoom = sizeCanvasX + 0 ;
  imageDisplayed.loadPixels();

  translate(midCanvasX, midCanvasY);
  rotate(radians(.3));

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
    // you can zoom in or out based upon the size of the image you display
    imageMode(CENTER);
    image(imageDisplayed,0,0,zoom, zoom);
  
}


// turning Red Sun
function filterStoredImage4() {
  // difference from canvas size will affect zoom
  // over to zoom in, under to zoom out
  var zoom = sizeCanvasX + 0;
  
  imageDisplayed.loadPixels();


  translate(midCanvasX, midCanvasY);
  // speed of rotation
  rotate(radians(.4));
 
  var x = 0;
  var y = 0;
  var P = 40;
  var N = -41.5;
  var off = 0;
  // We will map the x to a new x
  // start at an offset
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      var locS = (x + (y * width))*4;
      var off = random(N,P);
      imageDisplayed.pixels[locS+0] = imageDisplayed.pixels[locS+0] + off + 2;
      imageDisplayed.pixels[locS+1] = imageDisplayed.pixels[locS+1] + off + 1;
      imageDisplayed.pixels[locS+2] = imageDisplayed.pixels[locS+2] + off - 1;
      imageDisplayed.pixels[locS+3] = 240 //imageDisplayed.pixels[locS+3];
    }
  }
  imageDisplayed.updatePixels();
  // you can zoom in or out based upon the size of the image you display
  imageMode(CENTER);
  image(imageDisplayed,0,0,zoom, zoom);

}


// turning Red Sun
function filterStoredImage4_1() {
  // difference from canvas size will affect zoom
  // over to zoom in, under to zoom out
  var zoom = sizeCanvasX + 0;
  
  imageDisplayed.loadPixels();


  translate(midCanvasX, midCanvasY);
  // speed of rotation
  rotate(radians(.4));
 
  var x = 0;
  var y = 0;
  var P = 40;
  var N = -41.5;
  var off = 0;
  // We will map the x to a new x
  // start at an offset
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      var locS = (x + (y * width))*4;
      var off = random(N,P);
      imageDisplayed.pixels[locS+0] = imageDisplayed.pixels[locS+0] + off + 2;
      imageDisplayed.pixels[locS+1] = imageDisplayed.pixels[locS+1] + off + 1;
      imageDisplayed.pixels[locS+2] = imageDisplayed.pixels[locS+2] + off - 1;
      imageDisplayed.pixels[locS+3] = 240 //imageDisplayed.pixels[locS+3];
    }
  }
  imageDisplayed.updatePixels();
  // you can zoom in or out based upon the size of the image you display
  imageMode(CENTER);
  image(imageDisplayed,0,0,zoom, zoom);

}

// using perlin noise
// not working at the moment
function filterStoredImage5() {
  // difference from canvas size will affect zoom
  // over to zoom in, under to zoom out
  var zoom = sizeCanvasX + 0;
  
  imageDisplayed.loadPixels();


  translate(midCanvasX, midCanvasY);
  // speed of rotation
  rotate(radians(.4));
 
  var x = 0;
  var y = 0;
  var P = 40;
  var N = -41.5;
  var off = 0;
  // We will map the x to a new x
  // start at an offset
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      var locS = (x + (y * width))*4;
      // using perlin noise
      var off = map(noise(pS), 0, 1, N, P);

      imageDisplayed.pixels[locS+0] = imageDisplayed.pixels[locS+0] + off + 2;
      imageDisplayed.pixels[locS+1] = imageDisplayed.pixels[locS+1] + off + 1;
      imageDisplayed.pixels[locS+2] = imageDisplayed.pixels[locS+2] + off - 1;
      imageDisplayed.pixels[locS+3] = 240 //imageDisplayed.pixels[locS+3];
      // increment perlin noise value
      pS += .1;
    }
  }
  imageDisplayed.updatePixels();
  // you can zoom in or out based upon the size of the image you display
  imageMode(CENTER);
  image(imageDisplayed,0,0,zoom, zoom);

}
