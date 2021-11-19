var x;
var y;
var w;
var h;

function setup() {
  // put setup code here
  var myCanvas = createCanvas(400,400);
  w = 100;
  h = 100;
  x = (myCanvas.width/2)- (w/2);
  y = (myCanvas.height/2) - (h/2);
}

function draw() {
  background(51);
  noFill();
  stroke(255);

  // this lags less then the separte function mouseDragged
  if (mouseIsPressed){
    x = mouseX;
    y = mouseY;
  }
  rect(x,y,w,h);
}
// If run this function the square lags more behind the mouse
// function mouseDragged(e){
//   x = mouseX
//   y = mouseY
// }
