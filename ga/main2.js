var canvasHeight = 400;   //change this if you want diff canvas size
var canvasWidth = 500;

var objectiveHeight = 30;   //change this if you want to change objective size
var objectiveWidth = 70;

var howManySteps = 300;   //change this if want to increase or decrease steps
var mutationRate = 0.01;   //change mutation rate

var dotSpawnX = canvasWidth/2;   //change this if you want diff spawn point of dots
var dotSpawnY = 350;

var howManyDots = 200; //change this if you want to increase or decrease dots spawned
var howManyGenerations = 40 //change this if you want to increase or decrease generations

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

var myPopulation;
var myObjective;

function startGame(){
    myGameArea.start();
    myPopulation = new Population(howManyDots);
    myObjective = new Objective((canvasWidth/2)-30,0,objectiveHeight,objectiveWidth);
}

function updateCanvas(){
    myGameArea.clear();

    if (myPopulation.allDotsDead()){
        if(myPopulation.generation === howManyGenerations){
            myGameArea.stop();
        }
        (myPopulation.calculateFitnessPop())
        myPopulation.naturalSelection();
        console.log(myPopulation.generation);
        myPopulation.mutate();
        myPopulation.resetScore();
    
    }
    myPopulation.displayStats();
    myPopulation.displayFitness();
    myPopulation.show(); 
    myPopulation.updatePosition();
    myObjective.show();

}