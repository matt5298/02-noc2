class Boid {
    constructor() {
        this.position = createVector(random(width),random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(0.5, 4));
        this.acceleration = createVector();
        this.maxForce = 1;
        this.maxSpeed = 4;
    }
    // this boid state copied to the passed boid
    setBoid(boid) {
        boid.position = this.position
        boid.velocity = this.velocity
        boid.acceleration = this.acceleration
    }

    edges() {
        if (this.position.x > width) {
            this.position.x = (this.position.x - width);
        } else if (this.position.x < 0){
            this.position.x = (width - this.position.x);
        }
        if (this.position.y > height) {
            this.position.y = (this.position.y - height);
        } else if (this.position.y < 0){
            this.position.y = (height - this.position.y);
        }
    }

    align(boids) {
        let perceptionRadius = 50;
        let steering = createVector();
        let total = 0;
        // stepping through array of passed boids
        for (let other of boids){
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other != this && d < perceptionRadius ) {
                steering.add(other.velocity);
                total++;
            }
        }
        if (total > 0){
            steering.div(total);
            steering.setMag(this.maxSpeed)
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }   
        return steering;
    }

    cohesion(boids) {
        let perceptionRadius = 100;
        let steering = createVector();
        let total = 0;
        // stepping through array of passed boids
        for (let other of boids){
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other != this && d < perceptionRadius ) {
                steering.add(other.position);
                total++;
            }
        }
        if (total > 0){
            steering.div(total);
            steering.sub(this.position);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }   
        return steering;
    }

    separation(boids) {
        let perceptionRadius = 50;
        let steering = createVector();
        let total = 0;
        // stepping through array of passed boids
        for (let other of boids){
            let d = dist(
                this.position.x, 
                this.position.y, 
                other.position.x, 
                other.position.y
                );
            if (other != this && d < perceptionRadius ) {
                let diff = p5.Vector.sub(this.position, other.position);
                diff.div(d);
                steering.add(diff);
                total++;
            }
        }
        if (total > 0){
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }   
        return steering;
    }


    flock(boids) {
        this.acceleration.set(0,0);
        let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);
        let separation = this.separation(boids);

                
        alignment.mult(alignSlider.value());
        cohesion.mult(cohesionSlider.value());
        separation.mult(separationSlider.value());
        

        this.acceleration.add(separation);
        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
    }

    update(){
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.acceleration.mult(0);
    }
    show() {
        strokeWeight(8);
        stroke(255);
        
        point(this.position.x, this.position.y);
    }
}