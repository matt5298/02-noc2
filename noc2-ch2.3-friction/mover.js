// instroduced adding vectors
class Mover {
    constructor(x,y,m){
        this.pos = createVector(x,y);
        this.vel = createVector(0,0);
        this.acc = createVector(0,0);
        this.forces = [];
        this.forceColor = [];
        // Can use this to off set the bottom away from the canvas bottom
        // so can see lines of force that may extend beyond the bottom.
        this.bottom = height - 100;
        // to have size of radius for edge collision detection
        this.mass = m;
        this.r = sqrt(this.mass * 100);
        this.color = 255;
    }

    friction(){
        // using this.bottom so can offset if needed
        let diff = this.bottom - (this.pos.y + this.r);
        if (diff <1) {
            // direction of friction
            let friction = this.vel.copy();
            friction.normalize();
            friction.mult(-1);
            // coefficent of friction
            let normal = this.mass;
            friction.setMag(mu * normal);
            this.applyForce(friction, 'yellow');
        }
    }
    applyForce(force,color) {
        // all forces added together are Accelleration this.acc

        // using static method because want result in new vector
        // with out affecting the parameter.
        let f = p5.Vector.div(force, this.mass)
        this.acc.add(f);

        // add each force to an array as applied
        // tried just the forces and they were too small to easily see
        // tried normalizing and then scaling but it doesn't show change in magnitude, just angle
        // trying to scale the magnitude
        append(this.forces, force.setMag(force.mag()*10));
        append(this.forceColor, color);
    }

    edges(){
        // offsetting the bottom so can see forces below it.
        let yOff = -50;
        // using this.bottom so can offset
        if (this.pos.y >= this.bottom - this.r ) {
            this.pos.y = this.bottom - this.r;
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
        // adding velocity to the array of forces to display
        append(this.forces, this.vel);
        append(this.forceColor, 'green');
        // set color according to velocity
        this.color = this.vel.mag();

    };
    show(){
        stroke(255);
        //fill(255,100);
        //colorMode(RGB,100);
        fill(200,100);
        strokeWeight(2);
        ellipse(this.pos.x,this.pos.y,this.r*2);      
        // add the forces
        // this.arrColors = ['red','green','yellow','blue','orange'];
        for ( let i = 0; i < this.forces.length; i++){
            stroke(this.forceColor[i]);
            line(this.pos.x, this.pos.y, this.pos.x + this.forces[i].x*20, this.pos.y + this.forces[i].y*20);
        }
        // reset forces
        this.forces = [];
        this.forceColor = [];
        // showing a line on the bottom
        stroke (255);
        line(0,this.bottom, width, this.bottom)
    };
};
