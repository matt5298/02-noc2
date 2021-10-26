// Converting from using X, Y variables to using a vector to store the X,Y
// Also created walker object to encapsulate behavior and data

"use strict";

let walker;
let v;

function setup() {
  // Set the title of the html page here
  var myTitle = 'Random Walk Vector'
  $("#headTitle").text(myTitle);
  
  createCanvas(400, 400);

  // walker = new Walker(width/2, height/2);
}

function draw() {
  background(0);
  let pos = createVector( 200, 200);
  let mouse = createVector(mouseX, mouseY);

  let v = p5.Vector.sub(mouse, pos);

  // v.normalize();
  // v.mult(50);
   
  v.setMag(100);


  translate(width/2, height/2);
  strokeWeight(4);
  stroke(255,255);
  line(0,0,v.x, v.y)
}