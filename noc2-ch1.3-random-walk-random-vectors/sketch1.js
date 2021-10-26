function setup(){
    createCanvas(400, 400);
    background(0); 
  }


function draw() {

  // center 0,0 in the middle of the canvas
  translate(width/2, height/2);

  // let v = createVector(-100,150);
  // this ends up creating a square, instead of the expected circle.
  // let v = createVector(random(-100,100), random(-100,100));
  
  // this picks a random unit vector
  // can't see much because it's a magnitude of 1
  v = p5.Vector.random2D();

  // multiply the vector, ie scale it with a scalar value
  v.mult(random(10,100));

  strokeWeight(4);
  stroke(255,50);
  line(0,0,v.x, v.y)

}