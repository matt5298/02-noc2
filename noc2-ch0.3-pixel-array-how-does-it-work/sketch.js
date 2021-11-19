// pixels on screen start with row (y) 0 and column (x) 0
// pixels in the pixel array are all in 1 dimension
// [0] = pixel 1 red
// [1] = pixel 1 green
// [2] = pixel 1 blue
// [3] = pixel 1 alpha

// pixel on the screen = x + (y * width)
// pixel color values in the pixel array = (x + (y * width)) * 4
// canvas of pixels 6 wide, 5 high
// to get array location of pixel (4,2)
// pixel number = 4 + (2 * 6) = 16
// pixel array index for color values  = (4 + 2 * 6) * 4 = 64
// 
function setup() {
  createCanvas(320, 240);
  // for dealing with high def displays
  pixelDensity(1);
  frameRate(1);
  
}

function draw() {
  background(51);

  loadPixels();
  for (var y = 0; y < height; y++){
    for(var x = 0; x < width; x++){
      var index = (x + y * width)*4;
        pixels[index + 0] = x;
        pixels[index + 1] = random(255);
        pixels[index + 2] = y;
        pixels[index + 3] = 255;
    
    }
  }
  updatePixels();
  noLoop();
}
