'use strict';

var timers = [];
var timerCount;  // how many timers have been created
var mousePressLeft = false;

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
  timers.length = 0;
  console.log (timers.length);
  timerCount = 1;
  let tmr = newTimer('Hello Worlds: ' + timerCount, timerCount-1);
  tmr.show();
  console.log('func reset timerDisplay Name: ' + tmr.getName());
  console.log('func reset timerDisplay Id: ' + tmr.getId())
  timers.push(tmr)
  console.log (timers.length);
  timerCount += 1;
  tmr = newTimer('Whasup: ' + timerCount, timerCount-1);
  tmr.show();
  timers.push(tmr)
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
  //background(51);
/*
  if (mouseIsPressed) {
    if (mousePressLeft){
      // this actually moves the coordinates to the next location
      timerDisplay.setCoord(mouseX, mouseY);
    }
    if (mouseButton === RIGHT) {
      if (timerDisplay.overTimer()){
        timerDisplay.showMore();
      }
    }
  }
  */
  console.log ('mousePressLeft:' + mousePressLeft)
  console.log('timers length in draw: ' + timers.length)

  for (let i=0; i < timers.length; i++){
    console.log(timers[i].getId())
    timers[i].show();
  }

}

/*
function mousePressed() {
  if (mouseButton === LEFT){
    if (timerDisplay.overTimer()) {
      mousePressLeft = true;
      // this sets whene the mouse pointer is in the timer display and drags from that location.
      // if you click in the center it will drag from there
      // if you click on the left it will drag from there
      timerDisplay.setMouseOffset(mouseX, mouseY);

    } // else {
      //timerCount += 1;
      //newTimer('Hello: ' + timerCount)
    //}
  }
  if (mouseButton === RIGHT){
    if (timerDisplay.overTimer()) {
      timerDisplay.timer.stop();
    }
  }
}

function mouseDragged() {
  //if (timerDisplay.overTimer()) {
  //}
}

function mouseReleased() {
  this.mousePressLeft = false;
}
*/
function newTimer(name,ids){
  // Start/Reset the application
  // create the object that is doing the timing
  let timerSimple = new TimerSimple(name);
  //console.log('func newTimer Start timer simple: ' + timerSimple.startTime);
  //console.log('func newTimer timerSimple name: ' + timerSimple.getName());
  //console.log(startTime)
  // create the object that displays the timer and pass it to it.
  let timerDisplay1 = new TimerDisplay(timerSimple, 10, 10, ids);
  //console.log(`func newTimer timerDisplay Name: ${timerDisplay1.timerName}`);
  //console.log('func newTimer timerDisplay Name: ' + timerDisplay1.getName());
  return timerDisplay1;
}