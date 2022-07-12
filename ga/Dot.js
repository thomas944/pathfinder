class Dot{
    constructor(objX, objY){
        this.brain = new Brain(howManySteps);

        this.pos = new Vector(dotSpawnX, dotSpawnY);
        this.vel = new Vector(0,0);
        this.acc = new Vector(0,0);

        this.spawn = true;
        this.dead = false;

        this.ObjX = objX;
        this.ObjY = objY;
        this.safe = false;
        this.isBest = false;
        
    }

    print(){
        console.log("hi")
    }

    show(){
        this.ctx = myGameArea.context;
        this.ctx.fillStyle = "black";
        if(this.isBest){
            this.ctx.fillStyle = "green";
            this.ctx.fillRect(this.pos.x, this.pos.y, 10, 10);
        }
        if (this.spawn){
            this.ctx.fillRect(dotSpawnX, dotSpawnY, 5,5);
            this.spawn = false;
        }
        if (this.dead){
            this.ctx.fillStyle = "red";
            this.ctx.fillRect(this.pos.x, this.pos.y, 5, 5);
        }
        else{
            this.ctx.fillRect(this.pos.x, this.pos.y, 5, 5);
        }
    }

    move(){
        if(this.brain.directions.length-1 > this.brain.steps){
            this.acc.x = this.brain.directions[this.brain.steps].x;
            this.acc.y = this.brain.directions[this.brain.steps].y;
            this.brain.steps +=1;
        } 
        else{
            this.dead = true;
        }
        this.vel.x = this.vel.x + this.acc.x;
        this.vel.y = this.vel.y + this.acc.y;
        this.vel.x = limitVelocity(this.vel.x);
        this.vel.y = limitVelocity(this.vel.y);
        this.pos.x = this.pos.x + this.vel.x;
        this.pos.y = this.pos.y + this.vel.y;
    }

    updatePosition(){
        var dotLeft = this.pos.x;
        var dotRight = this.pos.x + (10);
        var dotTop = this.pos.y;
        var dotBottom = this.pos.y+10;
        var ObjLeft = this.ObjX;
        var ObjRight = this.ObjX + objectiveWidth;
        var ObjTop = this.ObjY;
        var ObjBottom = this.ObjY + objectiveHeight;
        

        if(!this.dead && !this.safe){
            this.move();
            if ((this.pos.x < 10 ) || (this.pos.x > canvasWidth-10) || (this.pos.y < 10) || (this.pos.y > canvasHeight-10)){
                this.dead = true;
            }    
            if (((dotRight > ObjLeft) && (dotRight < ObjRight) && (dotTop < ObjBottom)) || ((dotLeft < ObjRight) && (dotLeft > ObjLeft) && (dotTop < ObjBottom))){
                this.safe = true;
            }    
        }

    }

    calculateFitness(){
        if(this.safe){
            this.fitness = (1/16) + 10000/(this.brain.steps * this.brain.steps)
        }
        else{
            this.distanceFromObj = Math.sqrt((Math.pow(Math.abs(this.pos.x-this.ObjX),2)) + (Math.pow(Math.abs(this.pos.y-this.ObjY),2)))
            this.fitness = 1/(this.distanceFromObj * this.distanceFromObj);
        }

        return this.fitness;
    }

    crossOver(){  
        var i;
        this.hybridBaby = new Dot((canvasWidth/2)-30,0);
        this.hybridBaby.brain = this.brain.cloneBrain();
        return this.hybridBaby;
    }

}