let particles = [];
let qtree;

function setup() {
  // put setup code here
  createCanvas(600, 400);
  for (let i = 0; i < 100; i++) {
    particles[i] = new Particle(random(width), random(height),5);
  }
}

 
function draw() {
  background(0);
  let boundary = new Rectangle(300,200,300,200)
  qtree = new QuadTree(boundary, 1);
  for (let p of particles) {
    let point = new Point(p.x, p.y, p);
    qtree.insert(point);
    qtree.show();
    p.move();
    p.render();
    p.setHighlight(false);
  }    

  for (let p of particles) {
    let range = new Circle(p.x, p.y, p.r*2);
    let points = qtree.query(range);
    for (let point of points) {
      let other = point.userData;
      if (p !== other && p.intersects(other)) {
        p.setHighlight(true);
      }
    }
  }
}

