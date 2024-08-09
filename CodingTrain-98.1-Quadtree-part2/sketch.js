let qTree;

function setup() {
  // put setup code here
  createCanvas(1200,600);


  let boundary = new Rectangle(600,300,600,300);
  qTree = new QuadTree(boundary, 5);

  // Random point generation

  for (let i = 0; i < 1500; i++){
    //let p = new Point(random(width), random(height));
    let x = randomGaussian(width / 2, width / 8);
    let y = randomGaussian(height / 2, height / 8);
    let p = new Point(x,y);
    //console.log(p)
    qTree.insert(p)
  }
}

 
function draw() {
  // put drawing code here

  background(0);
  qTree.show();

  strokeWeight(1);
  rectMode(CENTER);
  //green rectangle
  stroke(0,255,0);
  //let range = new Rectangle(random(width),random(height),400,400);
  let range = new Rectangle(mouseX,mouseY,100,100);
  rect(range.x, range.y, range.halfW*2, range.halfH*2);
  let points = qTree.query(range);
  for (let p of points){
    strokeWeight(4);
    point(p.x, p.y); 
  }

}

function mouseClicked(){

}