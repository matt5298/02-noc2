// perlin noise is smoothed random numbers
// a subsequent number is related to the previous number to smooth it out

// perlin noise is calculated with multiple octavs
// each octave is a level within another octave which perlin noise is calculate
var xoff = 0;

function setup() {
  // put setup code here
  createCanvas(400,400);

}

function draw() {
  // put drawing code here
  background(51);
  var xrandom = random(width);
  var xperlin = map(noise(xoff), 0, 1, 0, width);
  // the smaller the jump here the smoother the movement
  // if too large it's almost like random except that perlin noise
  // has a bell curve distribution instead of the even distribution of random
  xoff += .015;

  // draw random elipse
  ellipse(xrandom,100,24,24);
  // draw perlin elipse
  ellipse(xperlin,300,24,24);
}
