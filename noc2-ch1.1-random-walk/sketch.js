"use strict";
var x;
var y;

function setup() {
  // Set the title of the html page here
  var myTitle = 'Random Walk'
  $("#headTitle").text(myTitle);
  
  createCanvas(400, 400);
  x = 200;
  y = 200;
  background(51);
  // frameRate(5);
}

function draw() {

  stroke(255);
  strokeWeight(2);
  var r = floor(random(4));
 switch (r) {
    case 0: 
      x = x + 1;
      break; // right
    case 1: 
      x = x - 1;
      break; // left
    case 2: 
      y = y - 1;
      break; // up
    case 3: 
      y = y + 1;
      break; // down
 }
 //point(x,y);
 fill(0);
 ellipse(x,y,5,5);
//  text (r,10,10,20,20);

}