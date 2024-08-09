"use strict";

//flock stuff
const flock = [];
const resetting = false
let flockSlider

function setup() {
  // Set the title of the html page here

  var myTitle = 'Coding Traing - Flocking Simulation'
  $("#headTitle").text(myTitle);

  // create canvas
  var sizeCanvasX = 640;
  var sizeCanvasY = 360;
  var myCanvas = createCanvas(sizeCanvasX, sizeCanvasY);

  // set the html dom parent
  myCanvas.parent('sketch-holder');
  // setup the controll panel
  $('.control-panel').text(myTitle);
  // adjust the size of the elements to match the canvas size set above
  
  $('.control-panel').css("height",sizeCanvasY );
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

  // A slider control
  $('.control-panel').append($("<div />", {id: "divSlider1Text", "class":"sliderText"}))
  $('#divSlider1Text').text("Flock Size")
  
  $('.control-panel').append($("<div />",{id: "divSlider1", "class":"slider"}))

  $('.control-panel').append($("<div />",{id: "divSlider1Val" }))
  $('#divSlider1').append('<input id="slider1" type="range" min="1" max="100" value="50" oninput="divSlider1Val.innerText = this.value">')
  $('#slider1').mouseup(myFunc)
  
  //Flock stuff
  flockSlider = select('#slider1');
  reset();
}

function myFunc() {
  console.log($('#slider1').val())
  reset();
}

function reset(){
  //put code here to reset the script.  Should be the same code to start the application
  //flock stuff
  clear();
  flock.length = 0 
  for (let i=0; i<$('#slider1').val(); i++){
  flock.push(new Boid());
  }
  
}

function alertAlert(messageString){
  window.alert(messageString)
}

function draw() {
  background(51);

  //flock stuff
  for (let boid of flock) {
    boid.edges();
    boid.flock(flock);
    boid.update();
    boid.show();
  }

}

