// perlin noise is smoothed random numbers
// a subsequent number is related to the previous number to smooth it out

// perlin noise is calculated with multiple octavs
// each octave is a level within another octave which perlin noise is calculate
// var xoff1 = 0;
// var xoff2 = 10000;
var inc = 0.01; // rate at which things are increased
var startInc = 0.01; // rate of scrolling
var start = 0; // used to scroll through the perlin noise function
//var ratio = 1; // ration between inc and start, which is perlin noise amplitude vs scrolling speed

function setup() {
  createCanvas(400,400);
  // frameRate(10);


}

function draw() {
  background(51);
  stroke(255);
  noFill();
  beginShape();
  var xoff = start; // used to get the value fed to the noise function as move accross screen
  for (var x = 0; x < width; x++){
    stroke(255);
    // this gives a random y value
    //var y = random(height);
  
    // this graphs perlin noise
    //var y = noise(xoff)*height;
    
    // sin function being graphed
    //var y = height / 2 +  sin(xoff) * height / 2;

    // sin function being graphed with perlin noise
    //var y = noise(xoff) * 100 + height / 2 +  sin(xoff) * height / 2;

    // sin function with perlin noise using mapping function
    var n = map(noise(xoff),0,1,-100,100);
    var s = map(sin(xoff), -1,1,0+20,height-20);
    var y = s + n;


    vertex(x, y);
    xoff += inc;
  }

  endShape();
  start += startInc;
  //noLoop();
}
