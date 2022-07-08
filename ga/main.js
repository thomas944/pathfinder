var canvasHeight = 400;
var canvasWidth = 500;

var test;

function startGame(){
    myGameArea.start();
    test = new createDot();
    test.createBrain(1000);
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
    var start = true;

    this.draw = function(){
        ctx = myGameArea.context;
        ctx.fillStyle = "blue"
        if (start){
            ctx.fillRect(250,200,10,10);
            start = false;
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
        //console.log(pos[1]);
        pos[0] = pos[0] + vel[0]+ acc[0];
        pos[1] = pos[1] + vel[1]+ acc[0];
    
        
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
    test.move();
    test.draw();

    steps++;
    if (steps > 1000){
        myGameArea.stop();
    }
    console.log(steps)
}