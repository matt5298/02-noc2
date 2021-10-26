// perlin noise is smoothed random numbers
// a subsequent number is related to the previous number to smooth it out

// perlin noise is calculated with multiple octavs
// each octave is a level within another octave which perlin noise is calculate
var xoff1 = 0;
var xoff2 = 10000;

function setup() {
  // put setup code here
  createCanvas(400,400);

}

function draw() {
  // put drawing code here
  background(51);
  var xperlin = map(noise(xoff1), 0, 1, 0, width);
  var yperlin = map(noise(xoff2), 0, 1, 0, height);
  // the smaller the jump here the smoother the movement
  // if too large it's almost like random except that perlin noise
  // has a bell curve distribution instead of the even distribution of random
  xoff1 += .02;
  xoff2 += .02;

  // draw perlin elipse
  ellipse(xperlin,yperlin,24,24);
}
