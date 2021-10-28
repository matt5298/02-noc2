

 let movers = [];
 let maxMovers = 1;
 let mu = 0.05;
 let gravity;


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

  $('.control-panel').append($("<div />",{id: "btntwo", "class":"btnDisplay"}))
  $('#btntwo').text('Wind: Blue');
  //$('#btntwo').click(alertAlert);
  $('.control-panel').append($("<div />",{id: "btn3", "class":"btnDisplay"}))
  $('#btn3').text('Weight: Red');

  $('.control-panel').append($("<div />",{id: "btn4", "class":"btnDisplay"}))
  $('#btn4').text('Friction: Yellow');

  $('.control-panel').append($("<div />",{id: "btn5", "class":"btnDisplay"}))
  $('#btn5').text('Velocity: Green');
// call reset to start
  reset();
  }

function reset(){
  gravity = createVector(0,0.05);
  for (let i = 0; i < maxMovers; i++){
  movers[i] = new Mover(random(width), 200, random(1,8));
  }


}
function alertAlert(){
  alert("Hello you clicked button Div");
}

function draw() {
  background(51);
  for (let mover of movers){
    if (mouseIsPressed){
      let wind = createVector(0.2,0);
      mover.applyForce(wind,'blue');
    }
    let weight = p5.Vector.mult(gravity, mover.mass);
    mover.applyForce(weight, 'red'); 

    mover.edges();
    mover.friction();
    mover.update();
    mover.show();
  }
}