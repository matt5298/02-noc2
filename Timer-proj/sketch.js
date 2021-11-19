"use strict";

var timerDisplay;
var timerSimple; 

function setup() {
  // Set the title of the html page here
  var myTitle = 'Timer stuff'
  $("#headTitle").text(myTitle);

  // create canvas
  var sizeCanvasX = 550;
  var sizeCanvasY = 550;
  var myCanvas = createCanvas(sizeCanvasX, sizeCanvasY);

  //////////////////////////////////////////////////
  // HTML manipulation
  /////////////////////////////////////////////////
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
  $('#btnReset').click(reset);

  $('.control-panel').append($("<div />",{id: "btntwo", "class":"btnDisplay"}))
  $('#btntwo').text('Button Two');
  $('#btntwo').click(function(){ alertAlert('Hello Alert World')});
  ////////////////////////////////////////////////////
  // start the program
  ///////////////////////////////////////////////////
  reset();
}

function reset(){
  // Start/Reset the application
  // create the object that is doing the timing
  var timerSimple = new TimerSimple();
  //console.log(startTime)
  // create the object that displays the timer and pass it to it.
  timerDisplay = new TimerDisplay(timerSimple,100,100);
  //console.log('Start timer simple: ' + timer1.startTime)
}

// right mouse button listener
(function() {
  document.addEventListener( "contextmenu", function(e) {
    e.preventDefault();
    console.log(e);
  });
})();

function alertAlert(messageString){
  window.alert(messageString)
}

function draw() {
  background(51);
  this.timerDisplay.show();
  if (mouseIsPressed) {
    if (mouseButton === RIGHT) {
      if (timerDisplay.overTimer()){
        timerDisplay.showMore();
      }
    }
  }
}

function mousePressed() {
  if (mouseButton === LEFT){
    if (timerDisplay.overTimer()) {
    timerDisplay.setMouseOffset(mouseX, mouseY);
    }
  }
  if (mouseButton === RIGHT){
    if (timerDisplay.overTimer()) {
      timerDisplay.timer.stop();
    }
  }
}
function mouseDragged() {
  if (timerDisplay.overTimer()) {
    timerDisplay.setCoord(mouseX, mouseY);
  }
}