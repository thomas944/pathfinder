var canvasHeight = 400;
var canvasWidth = 500;

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateCanvas, 20);
        this.frameNo = 0;
    },
    clear : function(){
        this.context.clearRect(0, 0, canvasWidth, canvasHeight);
    },
    stop : function(){
        clearInterval(this.interval);
    }
}

class Vector{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}
class Dot{
    constructor(){
        this.brain = new Brain(500);

        this.pos = new Vector(canvasWidth/2, canvasHeight/2);
        this.vel = new Vector(0,0);
        this.acc = new Vector(0,0);

        this.spawn = true;
        this.dead = false;
    }

    print(){
        console.log("hi")
    }

    show(){
        this.ctx = myGameArea.context;
        this.ctx.fillStyle = "blue";
        if (this.spawn){
            this.ctx.fillRect(250,200,10,10);
            this.spawn = false;
        }
        if (this.dead){
            this.ctx.fillStyle = "red";
            this.ctx.fillRect(this.pos.x, this.pos.y, 10, 10);
        }
        else{
            this.ctx.fillRect(this.pos.x, this.pos.y, 10, 10);
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
        console.log(this.vel.x + this.acc.x);
    }

    updatePosition(){
        if(!this.dead){
            this.move();
            if ((this.pos.x < 10 ) || (this.pos.x > canvasWidth-10) || (this.pos.y < 10) || (this.pos.y > canvasHeight-10)){
                this.dead = true;
            }    
        }

    }
}

class Brain{
    constructor(size){
        this.directions = [];
        this.steps = 0;
        var i;

        for (i=0; i<size; i+=1){
            this.directions.push(new Vector(1*flip(0,1)*Math.random(), 1*flip(0,1)*Math.random()));
            //console.log(this.directions);
        }

    }
}

class Population{
    constructor(size){
        var i;

        this.population = [];
        for(i=0; i<size; i+=1){
            this.population.push(new Dot());
        }
    }
    show(){
        var i;

        for(i=0; i<this.population.length; i+=1){
            this.population[i].show();
        }
    }
    updatePosition(){
        var i;
        
        for(i=0; i<this.population.length; i++){
            this.population[i].updatePosition();
        }
    }
}

function flip(min, max) {
    if ((Math.floor(Math.random() * (max - min + 1) ) + min) === 0){
         return -1;
    }
    else{ return 1; } 
}

function limitVelocity(currentVelocity){
    if (currentVelocity >= 5){
        return 5;
    }
    if (currentVelocity <= -5){
        return -5;
    }
    return currentVelocity;
}

var myPopulation;

function startGame(){
    myGameArea.start();
    myPopulation = new Population(10);
}

function updateCanvas(){
    myGameArea.clear();
    myPopulation.show();
    myPopulation.updatePosition();
    

}