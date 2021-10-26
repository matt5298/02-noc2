class Walker {
    constructor(x,y){
        this.pos = createVector(x,y);
    }

    update(){
        this.pos.x = this.pos.x + random(-1,1);
        this.pos.y = this.pos.y + random(-1,1);
    };
    show(){
        stroke(255);
        fill(0);
        strokeWeight(2);
        ellipse(this.pos.x,this.pos.y,5,5);      
    };
}
