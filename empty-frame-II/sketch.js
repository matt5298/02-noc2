"use strict";

var newTimer;

function setup() {
  // Set the title of the html page here
  var myTitle = 'Hello World P5.js'
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
  var startTime = new Date();
  console.log(startTime)
  newTimer = new Timer(startTime,100,100);
}

function alertAlert(messageString){
  window.alert(messageString)
}

function draw() {
  background(51);

  // put drawing code here
  this.newTimer.show();
  // if (mouseIsPressed) {
    // if (mouseButton === RIGHT) {
      // if (newTimer.overTimer()){
        // this.newTimer.showMore();
      // }
    // }
  // }
}

function mousePressed() {
  if (mouseButton === LEFT){
    if (newTimer.overTimer()) {
    newTimer.setMouseOffset(mouseX, mouseY);
    }
  }
}
function mouseDragged() {
  if (newTimer.overTimer()) {
    newTimer.setCoord(mouseX, mouseY);
  }
}