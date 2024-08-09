"use strict";

//flock stuff
// contains current state
const flock = [];
// contains next calculated state
const flock2 = [];
const resetting = false

let flockSlider;
let alignSlider, cohesionSlider, separationSlider;

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
  $('#slider1').mouseup(SliderFlockOutput)

  function SliderFlockOutput() {
    console.log($('#slider1').val())
    reset();
  }
  
  // A slider control Align
  $('.control-panel').append($("<div />", {id: "divSliderAlignText", "class":"sliderText"}))
  $('#divSliderAlignText').text("Align Slider")
  
  $('.control-panel').append($("<div />",{id: "divSliderAlign", "class":"slider"}))

  $('.control-panel').append($("<div />",{id: "divSliderAlignVal" }))
  $('#divSliderAlign').append('<input id="sliderAlign" type="range" min="0" max="5" step="0.1" value=".5" oninput="divSliderAlignVal.innerText = this.value">')
  $('#sliderAlign').mouseup(SliderAlignOutput)

  function SliderAlignOutput() {
    console.log($('#sliderAlign').val())
    //reset();
  }
  
  // A slider control Cohesion
  $('.control-panel').append($("<div />", {id: "divSliderCohesionText", "class":"sliderText"}))
  $('#divSliderCohesionText').text("Cohesion Slider")
  
  $('.control-panel').append($("<div />",{id: "divSliderCohesion", "class":"slider"}))

  $('.control-panel').append($("<div />",{id: "divSliderCohesionVal" }))
  $('#divSliderCohesion').append('<input id="sliderCohesion" type="range" min="0" max="5" step="0.1" value=".5" oninput="divSliderCohesionVal.innerText = this.value">')
  $('#sliderCohesion').mouseup(SliderCohesionOutput)

  function SliderCohesionOutput() {
    console.log($('#sliderCohesion').val())
    //reset();
  }


// A slider control Separation
$('.control-panel').append($("<div />", {id: "divSliderSeparationText", "class":"sliderText"}))
$('#divSliderSeparationText').text("Separation Slider")

$('.control-panel').append($("<div />",{id: "divSliderSeparation", "class":"slider"}))

$('.control-panel').append($("<div />",{id: "divSliderSeparationVal" }))
$('#divSliderSeparation').append('<input id="sliderSeparation" type="range" min="0" max="5" step="0.1" value=".5" oninput="divSliderSeparationVal.innerText = this.value">')
$('#sliderSeparation').mouseup(SliderSeparationOutput)

function SliderSeparationOutput() {
  console.log($('#sliderSeparation').val())
  //reset();
}

// A check box
$('.control-panel').append($("<div />", {id: "divCheckboxPauseText", "class":"sliderText"}))
$('#divCheckboxPauseText').text("Pause checkbox")

$('.control-panel').append($("<div />",{id: "divCheckboxPause", "class":"checkbox"}))
$('#divCheckboxPause').append('<input type="checkbox" id="checkboxPause">')
$('#checkboxPause').mouseup(checkboxPauseOutput)

function checkboxPauseOutput() {
  console.log($('#checkboxPause').is(':checked'))
  console.log($('#checkboxPause').is(':checked')==false)
  //reset();
}




  //Flock stuff

  flockSlider = select('#slider1');
  alignSlider = select ('#sliderAlign');
  cohesionSlider = select('#sliderCohesion');
  separationSlider = select('#sliderSeparation');
  reset();
}



function reset(){
  //put code here to reset the script.  Should be the same code to start the application
  //flock stuff
  clear();
  flock.length = 0 
  flock2.length = 0
  for (let i=0; i<$('#slider1').val(); i++){
  flock.push(new Boid());
  flock2.push(new Boid());
  }
  
}

function alertAlert(messageString){
  window.alert(messageString)
}

function draw() {
  if ($('#checkboxPause').is(':checked')==false) {
    background(51);

    //flock stuff
    // step through current flock and copy to the next flock
    for (let i=0; i<flock.length; i++){
      flock[i].setBoid(flock2[i])
    }
    //update flock2 by using flock
    for (let boid of flock2) {
      boid.edges();
      boid.flock(flock);
    }
    //copy flock2 to flock and display
    for (let i=0; i<flock.length; i++){
      flock2[i].setBoid(flock[i])
      flock[i].update();
      flock[i].show();
    }

  }
}

