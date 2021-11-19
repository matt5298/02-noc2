"use strict";

var x;
var y;
var a;

var aVelocity;
var aAcceleration;


function setup() {
  // Set the title of the html page here
  var myTitle = 'Angular Motion'
  $("#headTitle").text(myTitle);

  // create canvas
  var sizeCanvasX = 550;
  var sizeCanvasY = 550;
  var myCanvas = createCanvas(sizeCanvasX, sizeCanvasY);

  
  // set the html dom parent
  myCanvas.parent('sketch-holder');
  // setup the controll panel
  //$('.control-panel').text(myTitle);
  // adjust the size of the elements to match the canvas size set above
  $('.control-panel').css("height",sizeCanvasY);
  $('.display-canvas').css("height",sizeCanvasY);
  $('.display-canvas').css("width",sizeCanvasX);
  
  // add control buttons
  $('.control-panel').append($("<div />",{id: "btnReset", "class":"btnButton"}))
  $('#btnReset').text('Reset');
  // reset by calling setup function
  $('#btnReset').click(reset);

  $('.control-panel').append($("<div />",{id: "btntwo", "class":"btnDisplay"}))
  $('#btntwo').text('Button Two');
  $('#btntwo').click(function(){ alertAlert('Hello Alert World')});

  reset();
}

function reset(){
  //put code here to reset the script.  Should be the same code to start the application
  x = 0;
  y = 0;
  a = 0;
  aVelocity = 0;
  aAcceleration = .05;

}

function alertAlert(messageString){
  window.alert(messageString)
}

function draw() {
  
   background(140);
  fill(255);
  stroke(255);
  
  drawBaton(width/2,height/2,a);

  // code for velocity and acceleration
 aVelocity += aAcceleration;
 a += aVelocity
 console.log(aVelocity);
}

function drawBaton(x,y){
  //translate to the x,y
  push();
  translate(x,y);
  rotate(radians(a));
  stroke(50,255);
  fill(255,255);
  //make it a horizontal batton to begin with
  //circles will be a radius of 5
  ellipse( -50,0,10);
  ellipse( 50,0,10);
  line(-45,0,45,0);
  stroke(color('red'),100);
  strokeWeight(4);
  point(0,0);
  pop();
}

