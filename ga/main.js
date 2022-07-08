var canvasHeight = 400;
var canvasWidth = 500;

var test;
var test2;

function startGame(){
    myGameArea.start();
    test = new createDot();
    test2 = new createDot();
    test2.createBrain(400);
    test.createBrain(400);
}

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

var steps = 0;
var dead = false;

function createDot(){
    var directionsX = [];
    var directionsY = [];
    var pos = [];            //height BY width
    pos.push(canvasHeight/2);
    pos.push(canvasWidth/2)
    var vel = [];
    var acc = [];
    vel.push(0);
    vel.push(0);
    acc.push(0);
    acc.push(0);

    var spawn = true;

    this.draw = function(){
        ctx = myGameArea.context;
        ctx.fillStyle = "blue"
        if (spawn){
            ctx.fillRect(250,200,10,10);
            spawn = false;
        }
        if (this.dead){
            ctx.fillStyle = "red"
            ctx.fillRect(pos[1],pos[0],10,10);
        }
        else{
            ctx.fillRect(pos[1],pos[0],10,10);
        }   
    }

    this.createBrain = function(size){
        for(i=0; i<size; i+=1){
            directionsX.push(1*flip(0,1)*Math.random());
            directionsY.push(1*flip(0,1)*Math.random());
            
        }
    }

    this.move = function(){
        
        if (directionsX.length > steps){
            acc[0] = directionsX[steps];
            acc[1] = directionsY[steps];
            steps = steps + 1;
        }
        else{
            this.dead = true;   //if runs out of steps, dies
        }
        //console.log(pos[1]);
        vel[0] = vel[0] + acc[0];
        vel[1] = vel[1] + acc[1];
        pos[0] = pos[0] + vel[0]; //pos[0] is the Y
        pos[1] = pos[1] + vel[1]; //pos[1] is the X
    }

    this.updatePosition = function(){
        if (!this.dead){
            this.move();
            if ((pos[1] < 10 ) || (pos[1] > canvasWidth-10) || (pos[0] < 10) || (pos[0] > canvasHeight-10)){
                this.dead = true;
            }
        }
    }

}



function flip(min, max) {
    if ((Math.floor(Math.random() * (max - min + 1) ) + min) === 0){
         return -1;
    }
    else{ return 1; } 
}

function updateCanvas(){
    myGameArea.clear();
    test.updatePosition();
    test2.updatePosition();
    test2.draw();
    test.draw();
    steps++;

    if(steps>2000){
        myGameArea.stop();
    }
    console.log(steps)
}