// instroduced adding vectors
class Mover {
    constructor(x,y,m){
        this.pos = createVector(x,y);
        this.vel = createVector(0,0);
        this.acc = createVector(0,0);
        // to have size of radius for edge collision detection
        this.mass = m;
        this.r = sqrt(this.mass * 10);
        this.color = 255;
    }

    // to start with setting all objects to a mass of 1 which means
    // vector F = vector A

    applyForce(force) {
        // using static method because want result in new vector
        // with out affecting the parameter.
        let f = p5.Vector.div(force, this.mass)
        this.acc.add(f);
    }

    edges(){
        if (this.pos.y >= height-this.r) {
            this.pos.y = height-this.r;
            this.vel.y *= -1;
        }
        if (this.pos.x >= width-this.r) {
            this.pos.x = width-this.r;
            this.vel.x *= -1;
        } else if (this.pos.x <= 0 + this.r) {
                this.pos.x = 0 + this.r;
                this.vel.x *= -1;
        }
    };
    

    update(){

        // adding accelleration to the velocity
        this.vel.add(this.acc);
        this.pos = this.pos.add(this.vel);
        // reset accelleration to 0 each time used
        this.acc.set(0,0);
        // set color according to velocity
        this.color = this.vel.mag();

    };
    show(){
        stroke(255);
        //fill(255,100);
        colorMode(RGB,100);
        fill(this.vel.x*5,this.vel.y*5,this.color*3,100);
        //strokeWeight();
        noStroke();
        ellipse(this.pos.x,this.pos.y,this.r*2);      
    };
};
