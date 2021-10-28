
'use strict';

class TimerSimple{
// Create a simple timer object
// when constructed get's a start time
// can return the elapsed time
// can be stopped
// only tracks one uninterrupted period of time
// has an id
// can get it's data
    constructor(){
        this.startTime = new Date();        
        this.running = true;
    }

    getElapsed(){
        // if running update the stopTime
        // if not running then we are stopped and just use existing stopTime
        if (this.running === true) {
            this.stopTime = new Date()
        }
        var elapsed = this.dateDiffInSec(this.startTime, this.stopTime)
        return elapsed;    
    }

    dateDiffInSec(a, b) {
        // Discard the time and time-zone information.  
        return (floor((b-a)/1000));
    }

    stop(){
        if (this.running === true) {
        this.running = false;
        this.stopTime = new Date();
        }
        return this.dateDiffInSec(this.startTime, this.stopTime)
    }
    getStopTime(){
        if (this.running === false){
            return this.stopTime
        }
    }
    isStopped() {
        if (this.running === false) {
            return true
        } else { false };
    }
    isRunning() {
        if (this.running === true) {
            return true
        } else { false };
    }
}

class TimerDisplay{
    constructor(timer1, x, y){
        this.timer = timer1;
        this.x = x;
        this.y = y;
        this.h = 20;
        this.w = 180;
        this.infoX;
        this.infoY;
        this.infoH = 50;
        this.infoW = 400;
        this.mouseOffsetX = 0;
        this.mouseOffsetY = 0;

    }

    show(){
        this.infoX = this.x
        this.infoY = this.y + this.h
        stroke(255)
        fill(255);
        rect(this.x,this.y,this.w,this.h)
        stroke(0);
        fill(0);
        text('elapsed: ' + this.timer.getElapsed(),this.x+5, this.y+15)
    }
    showMore(){
        //relies on infoX and infoY set in the show method
        stroke(255);
        fill(255);
        rect(this.infoX, this.infoY, 400, 50);
        stroke(0);
        fill(0);
        text('Started: ' + this.timer.getStartTime(),this.infoX+5, this.infoY+15)
        stroke(0);
        fill(0);
        // console.log(this.now);
        //text('Current: ' + this.now, this.infoX+5, this.infoY+35)
    }

    overTimer() {
        if (
            mouseX > this.x &&
            mouseX < this.x + this.w &&
            mouseY > this.y &&
            mouseY < this.y + this.h
          ) {
            return true;
            }
        }

    setMouseOffset(x,y){
        this.mouseOffsetX = x - this.x;
        this.mouseOffsetY = y - this.y;
        // console.log('calculate offset: ' + this.mouseOffsetX + ", " + this.mouseOffsetY);
    }
    setCoord(x,y){
        // console.log(this.mouseOffsetX + ", " + this.mouseOffsetY);
        this.x = x - this.mouseOffsetX;
        this.y = y - this.mouseOffsetY;
    }
 }