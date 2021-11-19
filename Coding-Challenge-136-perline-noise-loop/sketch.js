"use strict";

var newTimer;

function setup() {
  // Set the title of the html page here
  var myTitle = 'Polar Perlin Noise Loop'
  $("#headTitle").text(myTitle);

  // create canvas
  var sizeCanvasX = 600;
  var sizeCanvasY = 600;
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

}

function alertAlert(messageString){
  window.alert(messageString)
}

function draw() {
  background(51);
  // translate(width/2, height/2);
  stroke(255);
  strokeWeight(1);
  noFill();
  // beginShape();
  // for (let a = 0; a < TWO_PI; a+= 0.01){
  //   let r = random(30,100);
  //   let x = r * cos(a);
  //   let y = r * sin(a);
  //   vertex(x,y);
  // }
  for (let x = 0; x < width; x += 0.1){
     let y = (cos(x)*10)+ (height/2);
    // let y = 10;
    point(x,y);
  }

  // endShape();
}

