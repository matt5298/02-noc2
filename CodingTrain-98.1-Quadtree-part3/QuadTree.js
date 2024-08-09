class Point {
    constructor(x,y, userData) {
        this.x = x;
        this.y = y;
        this.userData = userData;
    }
}

// circle class for a circle shaped query
class Circle {
    constructor(x,y,r){
        this.x = x;
        this.y = y;
        this.r = r;
        this.rSquared = this.r * this.r;
    }

    contains(point){
        // return true if inside this circle
        let d = Math.pow((point.x - this.x), 2) + Math.pow((point.y - this.y), 2);
        return d <= this.rSquared;        
    }

    intersects(range) {
        let xDist = Math.abs(range.x - this.x);
        let yDist = Math.abs(range.y - this.y);

        //radius of the circle
        let r = this.r;

        let w = range.w / 2;
        let h = range.h / 2;

        let edges = Math.pow((xDist - w), 2) + Math.pow((yDist - h), 2);

        // no intersection
        if (xDist > (r +  w) || yDist > (r + h))
            return false; 

        // intersection within the circle
        if (xDist <= w || ydist <= h)
            return true;
        
        // intersection on the edge of the circle
        return edges <= this.rSquared;

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

    intersects(range){
        return !(range.x - range.halfW > this.x + this.halfW ||
            range.x + range.halfW < this.x - this.halfW ||
            range.y - range.halfH > this.y + this.halfH ||
            range.y + range.halfH < this.y - this.halfH)
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
        this.northwest = new QuadTree(nw, this.capacity);        
        let se = new Rectangle(x + halfW /2, y + halfH/2, halfW/2, halfH / 2)
        this.southeast = new QuadTree(se, this.capacity);        
        let sw = new Rectangle(x - halfW /2, y + halfH/2, halfW/2, halfH / 2)
        this.southwest = new QuadTree(sw, this.capacity);        

    }

    query(range, found){
        if (!found){
            found = [];
        }
        if (!this.boundary.intersects(range)){
            // empty array
            return found;
        } else {
            for (let p of this.points) {
                if (range.contains(p)) {
                    found.push(p);
                }
            }
            if (this.divided) {
                this.northwest.query(range, found);
                this.northeast.query(range, found);
                this.southwest.query(range, found);
                this.southeast.query(range, found);
            }
            return found;
        }
        return found;
    }

    show(){
        push();
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
            strokeWeight(1);
            point(p.x, p.y);
        }
        pop();
    }
}