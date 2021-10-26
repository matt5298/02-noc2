// perlin noise is smoothed random numbers
// a subsequent number is related to the previous number to smooth it out

// perlin noise is calculated with multiple octavs
// each octave is a level within another octave which perlin noise is calculate
// var xoff1 = 0;
// var xoff2 = 10000;
var inc = 0.01; // rate at which things are increased
var start = 0;
function setup() {
  pixelDensity(1);
  createCanvas(400,600);
  // frameRate(60);


}

function draw() {
  var yoff = start;
  loadPixels();
  for (var y = 0; y < height; y++) {
    var xoff = 0;
    for (var x = 0; x < width; x++){
        var index = (x + y * width)*4;
        var r = noise(xoff,yoff)* 255;
        pixels[index + 0] = r;
        pixels[index + 1] = r;
        pixels[index + 2] = r;
        pixels[index + 3] = 255;
        xoff += inc;
    }
    yoff += inc;
  }
  updatePixels();
  start += .05;
  //noLoop();
}
