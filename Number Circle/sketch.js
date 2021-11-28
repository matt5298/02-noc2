var lenOne = 100
var cRad = 0;
var cDiam = 0;
var i = 0;
var fr = 20;
var cX = 6200;
var cY = 6200; 
function setup() {
  // put setup code here
  cRad = (lenOne*i)/ (PI * 2);
  cDiam = 2 * cRad;
  console.log(cRad)
  createCanvas(cX,cY);
  stroke(0);
  ellipseMode(CENTER);
  ellipse(width/2,height/2,cDiam + 10, cDiam + 10);
  frameRate(fr);
}

function draw() {
  // put drawing code here
i +=1;
// 2*PI*R = X
// R = X/2*PI
cRad = (lenOne*i)/ (PI * 2);
cDiam = 2 * cRad;
// stroke((i*10)%255,(255%(i*10)) + 10, (255%(i*10)) + 40 );
// console.log('i:i%255 ' + str(i) + ':' + str(i%255));
stroke((i%255)+random(-10,10),(i%255)+random(-10,10),(i%255)+random(-10,10));
strokeWeight(.1);
//  noFill();
// if (cDiam < width || cDiam < height) {
if (true){
ellipse(width/2,height/2,cDiam + 10, cDiam + 10);

// what is angle of divisions in the circle
 dRad = (2*PI)/ i
// draw the line
push();
stroke(0);
// stroke((i%(255/5))*5);
// stroke((i%255)+random(-40,40),(i%255)+random(-40,40),(i%255)+random(-40,40));
translate(width/2,height/2);
for (let ct = 0; ct < i; ct ++){
  let v = p5.Vector.fromAngle((ct*dRad),cRad+5)
  line(0,0,v.x, v.y);
}
pop();
// The angle starts at 0 and goes to 2PI
// 1 = 0
// 2 = 0,180
// 3 = 0, 2/3 * PI, 4/3 * PI,
} 
}