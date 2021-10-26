
// perlin noise is smoothed random numbers
// a subsequent number is related to the previous number to smooth it out

// perlin noise is calculated with multiple octavs
// each octave is a level within another octave which perlin noise is calculate

// gradient noise is the smoothing of the noise

// simplex noise, create n dimensional gradient noise
// tries to get rid of directional artifacts
// instead of a square grid, a tiled equilateral triangles grid is used.
// simplex is patented

// opensimplex noise is similar and open source
// have in webpage before this script the opensimplex.js script

// settings that I liked
var settings = {};
settings['set_sun'] = {
  increment: 0.07,
  zoff: 0.0,
  zincrement: 0.01,
  mode: 1,
};
settings['set_rorschach'] = {
  increment: 0.009,
  zoff: 0.0,
  zincrement: 0.001,
  mode:2,
};
settings['set_simplex_noise'] = {
  increment: 0.009,
  zoff: 0.0,
  zincrement: 0.005,
  mode:3,
};
settings['set_lava_lamp'] = {
  increment: 0.002,
  zoff: 0.0,
  zincrement: 0.005,
  mode:1,
};
settings['set_nice_dark_mode'] = {
  increment: 0.009,
  zoff: 0.0,
  zincrement: 0.005,
  mode:1,
};
settings['set_edge_of_a_cloud'] = {
  increment: 0.001,
  zoff: 0.0,
  zincrement: 0.005,
  mode:3,
};

function setup() {
  size = 400;
  background(51);
  pixelDensity(1);
  var canvas = createCanvas(size,size);
  // Move the canvas so it’s inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');
  // settings initialized
  increment = 0;
  zoff = 0;
  zincrement = 0;
  mode = 0;
  // track which settings are being used
  // start at -1 because it increments to start the loop 
  setI = -1;
  // track how many times the loop has run
  loopCount = 0;
  // interval at which the settings are changed, init() is called
  loopChangeSettings = 1000;
  init();
}
function mouseClicked(){
  init();
};

function init() {
  // increment the settings counter
  setI += 1;
  // using mod func to make sure settings count allways in the range of the length of settings keys.
  setI = setI % Object.keys(settings).length
  console.log(setI % Object.keys(settings).length)
  // get the settings based on the counter
  var mySet = settings[Object.keys(settings)[setI]];
  console.log ( Object.keys(settings)[setI] + ", " + mySet);
  // using 3d noise to create simple animated texture.
  // here the 3d is treated as time.
  increment = mySet['increment'];

  // the noise function's 3rd argument, a global variable that increments
  zoff = mySet['zoff'];
  // we will increment zoff differently than xoff and yoff
  zincrement = mySet['zincrement'];

  // modes are 
  // 1, simplex with lots of black because multiplying -1 to 1 by 255
  // 2, black and white because multiplying by 255 twice
  // 3, normal mode with greyscale
  mode = mySet['mode']; 
  loopCount = 0;
}


function draw() {
  // optional: adjust noise detail here
  // noiseDetail(8,0.65);

  loadPixels();
  xoff = 0.0; // start xoff at 0
  for (var x = 0; x < width; x++){
    xoff += increment; 
    yoff = 0.0
    for (var y = 0; y < height; y++) {
      yoff += increment;
      //using simplex 3d function to generate the noise number
      //but because it generates number between -1 and 1 then * by 255
      //gives us lots of black because <=0 is black.  
      if (mode == 1){
      bright = simplex3(xoff, yoff, zoff)*255;
      var index = (x + y * width)*4;
        pixels[index + 0] = bright;
        pixels[index + 1] = bright;
        pixels[index + 2] = bright;
        pixels[index + 3] = 255;
      }
      else if(mode==2){
      // getting a number n for the noise number and then mapping
      // mapping to 0 to 255
      // mapping is running very slow so replaced with formula below
       n = simplex3(xoff, yoff, zoff)*255;
      // bright = map (n, -1, 1,0,255);
      bright = (n + 1) * (255/2)
      // reflecting about the vertical axis
      if (x<=width/2){
        var index = (x + y * width)*4;
          pixels[index + 0] = bright;
          pixels[index + 1] = bright;
          pixels[index + 2] = bright;
          pixels[index + 3] = 255;
        }
        else if (x > width/2){
          center = width/2;
          newX = center-(x-center);
          // the position past the center
          var index1 = (x + y * width)*4;
          // the position before the center that has the values I want
          var index2 = (newX + y * width)*4;
  
          pixels[index1 + 0] = pixels[index2 + 0]
          pixels[index1 + 1] = pixels[index2 + 1]
          pixels[index1 + 2] = pixels[index2 + 2]
          pixels[index1 + 3] = pixels[index2 + 3]
  
        }
  

      }
      else if(mode==3){
        n = simplex3(xoff, yoff, zoff);
        // mapping is running very slow so replaced with formula below
        //bright = map (n, -1, 1,0,255);  
        bright = (n + 1) * (255/2)
        var index = (x + y * width)*4;
        pixels[index + 0] = bright;
        pixels[index + 1] = bright;
        pixels[index + 2] = bright;
        pixels[index + 3] = 255;

      }
    }
    yoff += increment;
  }
  updatePixels();
  xoff += increment;
  zoff += zincrement;
  loopCount += 1;
  // create a rectangle timer bar at the bottom
  rH = 16;
  rW = size;
  rX = 0;
  rY = size - rH;
  rIncrement = size / loopChangeSettings;
  fill(255,150);
  timerRect = rect(rX, rY, rW - (rIncrement*loopCount), rH);
  // put the name of the current configuration on the timer box
  fill(0);
  text(Object.keys(settings)[setI] + " (click mouse to change)",rX+5, rY+12)
  if (loopCount >= loopChangeSettings){
    init();
  }
  //noLoop();
}
