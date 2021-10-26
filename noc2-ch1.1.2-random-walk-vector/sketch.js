// Converting from using X, Y variables to using a vector to store the X,Y
// Also created walker object to encapsulate behavior and data

"use strict";

let walker;

function setup() {
  // Set the title of the html page here
  var myTitle = 'Random Walk Vector'
  $("#headTitle").text(myTitle);
  
  createCanvas(400, 400);
  // x = 200;
  // y = 200;
  walker = new Walker(width/2, height/2);
  background(51);
  // frameRate(5);
}

function draw() {
  walker.update();
  walker.show();
}