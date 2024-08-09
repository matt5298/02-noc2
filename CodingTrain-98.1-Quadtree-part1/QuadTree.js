class Point {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
}

class Rectangle {
    // x,y are the center of the square
    // halfW, halfH is half the width or half the height
    constructor(x,y,halfW,halfH) {
        this.x = x;
        this.y = y;
        this.halfW = halfW;
        this.halfH = halfH;
    }

    contains(point){
        // return true if inside this rectangle
        return(point.x >= this.x - this.halfW &&
            point.x <= this.x + this.halfW &&
            point.y >= this.y - this.halfH &&
            point.y <= this.y + this.halfH);
    }
}

class QuadTree {
    constructor (boundary, n) {
        this.boundary = boundary;
        this.capacity = n
        this.points = [];
        this.divided = false;
    }

    insert(point) {

        if (!this.boundary.contains(point)) {
            return false;
        }

        if(this.points.length < this.capacity){
            this.points.push(point);
            return true;
        } else {
            if (!this.divided) {
                this.subdivide();
                this.divided = true;
            }
            if (this.northeast.insert(point)) {
                return true;
            } else if (this.northwest.insert(point)){
                return true;
            } else if (this.southeast.insert(point)){
                return true;
            } else if (this.southwest.insert(point)) {
                return true;
            }
        }
    }

    subdivide(){
        let x = this.boundary.x
        let y = this.boundary.y
        let halfW = this.boundary.halfW
        let halfH = this.boundary.halfH
    
        let ne = new Rectangle(x + halfW/2, y - halfH/2, halfW/2, halfH / 2)
        this.northeast = new QuadTree(ne,this.capacity);        
        let nw = new Rectangle(x - halfW /2, y - halfH/2, halfW/2, halfH / 2)
        this.northwest = new QuadTree(nw, 4);        
        let se = new Rectangle(x + halfW /2, y + halfH/2, halfW/2, halfH / 2)
        this.southeast = new QuadTree(se, 4);        
        let sw = new Rectangle(x - halfW /2, y + halfH/2, halfW/2, halfH / 2)
        this.southwest = new QuadTree(sw, 4);        

    }

    show(){
        stroke(255);
        strokeWeight(1);
        noFill();
        rectMode(CENTER);
        rect(this.boundary.x, this.boundary.y, this.boundary.halfW * 2, this.boundary.halfH * 2);
        if (this.divided) {
            this.northeast.show();
            this.northwest.show();
            this.southeast.show();
            this.southwest.show();
        }
        for (let p of this.points) {
            strokeWeight(4);
            point(p.x, p.y);
        }
    }
}