
var canvasHeight = 800;
var canvasWidth = 1000;

var player;
var myObstacles = [];

var isJumping = false;
var jumpSpd = 0;

var score = 0;

function startGame() {
    myGameArea.start();

    player = new createComponent(100,100,10,100, "red");
    obstacle = new createComponent(20, 1000, 700, 500, "green");
    scoreBoard = new createScoreBoard("30px consolas", 100, 100, "black");
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

var fallSpd = 0;

function createComponent(width, height, x, y, color, type){
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 2 ;
    this.gravitySpd = 0;

    //ctx = myGameArea.context;
    //ctx.fillRect(this.x, this.y, this.width, this.height);

    this.draw = function(){
        ctx = myGameArea.context;
        
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
    this.makeFall = function(){
        this.gravitySpd += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpd;
        this.stopFalling();
    }

    this.stopFalling = function(){
        var ground = canvasHeight - this.height;
        if (this.y > ground){
            this.y = ground;
            this.gravitySpd = 0;
        }
    }

    this.moveRight = function(){
        this.x += 1;
    }

    this.collision = function(otherObj){
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherObj.x;
        var otherright = otherObj.x + (otherObj.width);
        var othertop = otherObj.y;
        var otherbottom = otherObj.y + (otherObj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
          crash = false;
        }
        return crash;
    }

    
}

function createScoreBoard(fontAndSize, x, y, color){
    this.x = x;
    this.y = y;
    this.font = fontAndSize;
    this.color = color;
    //ctx = myGameArea.context;
    //ctx.font = size;
    //ctx.fillStyle = color;
    //ctx.fillText(this.text. this.x, this.y);
    this.draw = function(){
        ctx = myGameArea.context;
        ctx.font = fontAndSize;
        ctx.fillStyle = color;
        ctx.fillText(this.text, this.x, this.y);
    }

}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
  }

function updateCanvas(){
    var x, y;

    for (i=0;i<myObstacles.length;i+=1){
        if (player.collision(myObstacles[i])){
        myGameArea.stop();
           return;
       }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(100)){
        x = myGameArea.canvas.width;
        y = myGameArea.canvas.height - 100; 
        myObstacles.push(new createComponent(10, 500, x, y, "green")) 
        score +=1;      
        }
    for (i = 0; i < myObstacles.length; i+=1){
        myObstacles[i].x += -6  ;
         myObstacles[i].draw();
    }
    scoreBoard.text = "SCORE: " + score;
    scoreBoard.draw();
    player.makeFall();
    player.draw();
    scoreBoard.draw();

}

function accelerate(n) {
    player.gravity = n;
}

document.body.onkeyup = function(e){
    if (e.key === ' '){
        accelerate(1);
    }    
}

document.body.onkeydown = function(e){
    if (e.key === ' '){
        accelerate(-2);
    }
}