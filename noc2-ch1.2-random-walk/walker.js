// instroduced adding vectors
class Walker {
    constructor(x,y){
        this.pos = createVector(x,y);
        this.vel = createVector(1,-1);
    }

    update(){
        this.pos = this.pos.add(this.vel);
    };
    show(){
        stroke(255);
        fill(255,100);
        strokeWeight(2);
        ellipse(this.pos.x,this.pos.y,10,10);      
    };
}
