let qTree;
let countPoints;

function setup() {
  // put setup code here
  createCanvas(1200,600);


  let boundary = new Rectangle(600,300,600,300);
  qTree = new QuadTree(boundary, 10);

  // Random point generation
  /*
  for (let i = 0; i < 500; i++){
    let p = new Point(random(width), random(height));
    //console.log(p)
    qTree.insert(p)
  }
  */

}

function draw() {
  // put drawing code here
  if (mouseIsPressed) {
    let m = new Point(mouseX, mouseY);
    qTree.insert(m);
    countPoints++;
    console.log(countPoints);
  }
  background(0);
  qTree.show();
}