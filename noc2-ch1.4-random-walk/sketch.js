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

  walker = new Walker(width/2, height/2);
}

function draw() {
  background(0);
  walker.update();
  walker.show();
}