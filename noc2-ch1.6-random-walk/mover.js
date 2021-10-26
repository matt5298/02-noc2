// instroduced adding vectors
class Mover {
    constructor(x,y){
        this.pos = createVector(x,y);
        this.vel = p5.Vector.random2D();
        this.vel.mult(random(3));
        this.wind = createVector(0,0);
        // perlin noise changing over time for the wind vector
        // this.t = 0;
        // this.wx = 0;
        // this.wy = 0;
    }

    update(){

        // creating a vector from the mouse position
        let mouse = createVector(mouseX, mouseY);
        // accelleration is difference between position and mouse
        this.acc = p5.Vector.sub(mouse, this.pos);
        // get a random unit vector for the wind
        // this.wind = p5.Vector.random2D();
        // set the magnitude according to the perlin function
        // this.wind.setMag(noise(this.t)*1000);
        //console.log(this.wind);
        // add the wind to the accelleration
        // this.acc = p5.Vector.add(this.acc, this.wind);
        // limit the accelleration
        this.acc.setMag(50);
        // adding accelleration to the velocity
        this.vel.add(this.acc);

        //limit the velocity so it's not too large after accelleration is applied
        this.vel.limit(5);
        this.pos = this.pos.add(this.vel);
        // increment t for time
        this.t += .1;
    };
    show(){
        stroke(255);
        fill(255,100);
        strokeWeight(2);
        ellipse(this.pos.x,this.pos.y,30,30);      
    };
}
