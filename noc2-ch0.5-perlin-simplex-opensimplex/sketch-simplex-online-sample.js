// need to have opensimplex.js in the webpage before call to this.

  var cols, rows;
  var scl = 20;
  var w = 2000;
  var h = 400;
  var zoff = 0;
  var inc = 0.1;
  var zinc = 0.02;
  var start = 0;
  var minVal = -10;
  var maxVal = 10;
  var startInc = 0;
  
  function setup() {
    createCanvas(800, 350, WEBGL);
    cols = w / scl;
    rows = h / scl;
  }
  
  function draw() {
    background(0);
    stroke(255);
    noFill();
    
    rotateX(PI/3);
    translate(-w/2, -h/2);
    
    let yoff = -start;
    for (let y = 0; y < rows - 1; y++) {
      let xoff = 0;
      beginShape(TRIANGLE_STRIP);
      for (let x = 0; x < cols; x++) {
        vertex(x*scl, y*scl, map(simplex3(xoff,yoff,zoff), 0, 1, minVal, maxVal));
        vertex(x*scl, (y+1)*scl, map(simplex3(xoff,yoff,zoff), 0, 1, minVal, maxVal));
        xoff += inc;
      }
      yoff += inc;
      endShape();
    }
    zoff += zinc;
    start += startInc;
  }