
function preload(){
  img = loadImage("grid.jpg");
  newImg = createImage(400,400);
  newImg2 = createImage(400,400);
}

function setup() {
  createCanvas(400, 400);
  background(100);
  image(img,0,0);
}

function draw() {
newImg = get();
image(newImg,0,0);
// newImg2 = newImg.get(0,0,399,399);
// image(newImg2,0,0,399,399);


}