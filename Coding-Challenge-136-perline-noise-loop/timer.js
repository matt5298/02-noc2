
'use strict';

class Timer{
    constructor(startTime, x, y){
        console.log(startTime)
        this.startTime = startTime
        this._MS_PER_DAY = 1000 * 60 * 60 * 24;
        this.x = x;
        this.y = y;
        this.h = 20;
        this.w = 180;
        this.now;
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
        //this.now = new Date()
        //var elapsed = this.dateDiffInSec(this.startTime, this.now)
        //console.log(elapsed);
        //text('elapsed: ' + elapsed,this.x+5, this.y+15)
    }
    showMore(){
        //relies on infoX and infoY set in the show method
        stroke(255);
        fill(255);
        rect(this.infoX, this.infoY, 400, 50);
        stroke(0);
        fill(0);
        text('Started: ' + this.startTime,this.infoX+5, this.infoY+15)
        stroke(0);
        fill(0);
        // console.log(this.now);
        text('Current: ' + this.now, this.infoX+5, this.infoY+35)
    }
    // a and b are javascript Date objects
    dateDiffInDays(a, b) {
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    
        return Math.floor((utc2 - utc1) / this._MS_PER_DAY);
    }

    dateDiffInSec(a, b) {
        // Discard the time and time-zone information.  
        return (floor((b-a)/1000));
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