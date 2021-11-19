"use strict";


function setup() {
  // Set the title of the html page here
  var myTitle = 'Hello World P5.js'
  $("#headTitle").text(myTitle);

  // create canvas
  var sizeCanvasX = 400;
  var sizeCanvasY = 400;
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
  drawTests();
};

function drawTests(){
  // size(200, 200);
  background(100);
  stroke(0);
  strokeWeight(0.5);
  drawGrid(20);
  noStroke();
  // draw the original position in gray
  fill(192);
  rect(20, 20, 40, 40);

  // draw a translucent red rectangle by changing the coordinates
  fill(255, 0, 0, 128);
  rect(20 + 60, 20 + 80, 40, 40);

  // draw a translucent blue rectangle by translating the grid
  fill(0, 0, 255, 128);
  push();
  translate(60, 80);
  rect(20, 20, 40, 40);
  pop();

  // draw houses with a function that uses translation to move coordinates to move the house
  fill(255);
  stroke(0);
  strokeWeight(1);
  for (let i = 10; i < 350; i += 50){
    drawHouse(i,300);
  }

  //rotate a rectangle
  smooth();
  fill(192);
  noStroke();
   rect(40, 160, 40, 40);
  push();
  translate(40,160);
  //pivot the grid
  rotate(radians(45));
  fill(0);
  rect(0,0,40,40);
  pop();

  //scale a rectangle
  push();
  stroke(0);
   fill(150,150);
  // relocate 0,0
  translate(140,200);
  push();
  stroke(color('blue'),200);
  fill(color('blue'),200);
  strokeWeight(3);
  line(0,0,100,0);
  line(0,0,0,100);
  strokeWeight(5);
  fill(color('red'),255);
  stroke(color('red'),255);
  point(0,0);
  pop();
  rect(0,0,40,40);
  stroke (0);
  push();
  scale(2,2);
  rect(0, 0,40,40);
  pop();
  pop();


}

function alertAlert(messageString){
  window.alert(messageString)
}

function draw() {
  // at the beginning of draw the canvas or the coordinate system is reset so no transforms, scale, rotate are applied.
  if(frameCount % 10 == 0) {
    fill(frameCount * 3 % 255, frameCount * 5 % 255, frameCount * 7 % 255);
    push();
    translate(300,100);
    rotate(radians(frameCount * 2 % 360));
    rect(0,0,80,20);
    pop();
  }
 


  
  // background(51);
  // stroke(100);
  // drawGrid(20);
  // //orig location of rectangle
  // stroke (150);
  // fill(150);
  // rect(20,20,40,40);
  // //moving the coordinate system is called translation
  // stroke(255);
  // fill(255);
  // translate(60,80);
  // rect(20,20,40,40);
}
  
function drawGrid(step){
  for (let x = 0; x < width; x += step){
    line (x,0, x, height);
  }
  for (let y = 0; y < height; y += step){
      line(0,y,width,y);
  }
}

function drawHouse(x,y){
  push();
  translate(x,y);
  triangle(15,0,0,15,30,15);
  rect(0,15,30,30);
  rect(12,30,10,15);
  pop();
}
