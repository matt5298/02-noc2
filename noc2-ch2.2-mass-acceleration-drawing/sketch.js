"use strict";

 let moverA;
 let moverB;

function setup() {
  // Set the title of the html page here
  var myTitle = 'Hello World P5.js'
  $("#headTitle").text(myTitle);


  // create canvas
  var sizeCanvasX = 400;
  var sizeCanvasY = 400;
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

  $('.control-panel').append($("<div />",{id: "btntwo", "class":"btnButton"}))
  $('#btntwo').text('Kick Left');
  $('#btntwo').click(kickLeft);

  $('.control-panel').append($("<div />",{id: "btnthree", "class":"btnButton"}))
  $('#btnthree').text('Kick Right');
  $('#btnthree').click(kickRight);

  $('.control-panel').append($("<div />",{id: "btnfour", "class":"btnButton"}))
  $('#btnfour').text('Kick Up');
  $('#btnfour').click(kickUp);

  $('.control-panel').append($("<div />",{id: "btnfive", "class":"btnButton"}))
  $('#btnfive').text('Kick down');
  $('#btnfive').click(kickDown);

  // call reset to start
  reset();
  }

function reset(){
  background(51);
  moverA = new Mover(100,200,20);
  moverB = new Mover(300,200,40)

}
function alertAlert(){
  alert("Hello you clicked button Div");
}

function kickLeft(){
  let kl = createVector(-100,0);
  moverA.applyForce(kl);
  moverB.applyForce(kl);
}
function kickRight(){
  let kl = createVector(+100,0);
  moverA.applyForce(kl);
  moverB.applyForce(kl);
}
function kickUp(){
  let kl = createVector(0,-100);
  moverA.applyForce(kl);
  moverB.applyForce(kl);
}
function kickDown(){
  let kl = createVector(0,100);
  moverA.applyForce(kl);
  moverB.applyForce(kl);
}

function draw() {
  
    let gravity = createVector(0,0.0);

    let weightA = p5.Vector.mult(gravity, moverA.mass);
    let weightB = p5.Vector.mult(gravity, moverB.mass);
    moverA.applyForce(weightA);
    moverB.applyForce(weightB);
    if (mouseIsPressed){
      let wind = createVector(0.1,0);
      moverA.applyForce(wind);
      moverB.applyForce(wind);
        };
  moverA.update();
  moverA.edges();
  moverA.show();
  moverB.update();
  moverB.edges();
  moverB.show();

}