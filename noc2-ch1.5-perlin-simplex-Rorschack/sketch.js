
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

// using 3d noise to create simple animated texture.
// here the 3d is treated as time.
// nice increments
// 0.1, small granular
increment = 0.009;
size = 600;
// the noise function's 3rd argument, a global variable that increments
zoff = 0.0;
// we will increment zoff differently than xoff and yoff
zincrement = 0.005;
//control border of the noise on the high contrast mode 2
boff = 0;
bincrement = 1;
bamplitude = 30;
// modes are 
// 1, simplex with lots of black because multiplying -1 to 1 by 255
// 2, black and white because multiplying by 255 twice
// 3, normal mode with greyscale
var mode = 2;

function setup() {
  pixelDensity(1);
  var canvas = createCanvas(size,size);
  // Move the canvas so it’s inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');
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
      }
      else if(mode==2){
      // getting a number n for the noise number and then mapping
      // mapping to 0 to 255
      // mapping is running very slow so replaced with formula below
       n = simplex3(xoff, yoff, zoff)*255;
      // bright = map (n, -1, 1,0,255);
      // messing with the n number to affect the border of the black areas
      bright = (n + (noise(boff)* bamplitude)) * (255/2)
      boff += bincrement;
      }
      else if(mode==3){
        n = simplex3(xoff, yoff, zoff);
        // mapping is running very slow so replaced with formula below
        //bright = map (n, -1, 1,0,255);  
        bright = (n + 1) * (255/2)
      }
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
    yoff += increment;
  }
  updatePixels();
  xoff += increment;
  zoff += zincrement;
  //noLoop();
}
