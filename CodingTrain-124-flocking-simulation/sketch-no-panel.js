"use strict";

//flock stuff
const flock = [];
const resetting = false
let flockSlider

function setup() {


  // create canvas
  var sizeCanvasX = 640;
  var sizeCanvasY = 360;
  var myCanvas = createCanvas(sizeCanvasX, sizeCanvasY);

  //Flock stuff
  flockSlider = createSlider(0,100,50,1);

  for (let i=0; i<flockSlider.value(); i++){
  flock.push(new Boid());
  }
  
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

