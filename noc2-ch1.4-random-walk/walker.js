// instroduced adding vectors
class Walker {
    constructor(x,y){
        this.pos = createVector(x,y);
        // this.vel = createVector(1,-1);

        
    }

    update(){
        // use random2D function to get a unit vector with random direction
        this.vel = p5.Vector.random2D();
        // scaling the vector with random number to change the velocity.
        this.vel.mult(random(3));
        this.pos = this.pos.add(this.vel);
    };
    show(){
        stroke(255);
        fill(255,100);
        strokeWeight(2);
        ellipse(this.pos.x,this.pos.y,10,10);      
    };
}
