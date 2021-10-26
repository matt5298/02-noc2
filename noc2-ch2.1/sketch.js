"use strict";

let mover;

function setup() {
  // Set the title of the html page here
  var myTitle = 'Hello World P5.js'
  $("#headTitle").text(myTitle);


  // create canvas
  var sizeCanvasX = 300;
  var sizeCanvasY = 300;
  var myCanvas = createCanvas(sizeCanvasX, sizeCanvasY);

  // Configuring the web page
  background(51);
  
  // set the html dom parent
  myCanvas.parent('sketch-holder');
  // setup the controll panel
  // $('.control-panel').text('Click to reset')
  // adjust the size of the elements to match the canvas size set above
  $('.control-panel').css("height",sizeCanvasY);
  $('.display-canvas').css("height",sizeCanvasY);
  $('.display-canvas').css("width",sizeCanvasX);

  // add control buttons
  $('.control-panel').append($("<div />",{id: "btnReset", "class":"btnButton"}))
  $('#btnReset').text('Reset');
  // reset by calling setup function
  $('#btnReset').click(reset);

  // $('.control-panel').append($("<div />",{id: "btntwo", "class":"btnButton"}))
  // $('#btntwo').text('Button Two');
  // $('#btntwo').click(alertAlert);

  // setting up the p5 application
  mover = new Mover(width/2, height/2);
}

function reset(){
  mover = new Mover(width/2, height/2);

}
function alertAlert(){
  alert("Hello you clicked button Div");
}

function draw() {
  background(51);
    let gravity = createVector(0,0.1);
    mover.applyForce(gravity);
    if (mouseIsPressed){
      let wind = createVector(0.1,0);
      mover.applyForce(wind);
    };
  mover.update();
  mover.edges();
  mover.show();
}