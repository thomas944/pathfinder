class Population{
    constructor(size){
        var i;
        this.reachedGoal = 0;
        this.ObjX = (canvasWidth/2)-30;
        this.ObjY = 0;
        this.fitnessSum = 0;
        this.size = size;
        this.generation = 1;

        this.minStep = howManySteps;

        this.population = [];
        for(i=0; i<size; i+=1){
            this.population.push(new Dot((canvasWidth/2)-30,0));
        }

        this.seen = [];
        for(i=0; i<size; i+=1){
            this.seen[i] = 0;
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
        for(i=0; i<this.population.length; i+=1){
            if(this.population[i].brain.step > this.minStep){
                this.population[i].dead = true;
            }
            else{
                this.population[i].updatePosition();
            }
        }
    }

    calculateFitnessPop(){
        var i;
        var sum = 0;
        for(i=0; i<this.population.length; i+=1){
            this.population[i].calculateFitness();
            sum += this.population[i].calculateFitness();
        }
        this.fitnessSum = sum;
        return sum;
    }


    allDotsDead(){
        var i;
        for(i=0; i<this.population.length; i+=1){
            if(!this.population[i].dead && !this.population[i].safe){
                return false;
                
            } 
        }
        return true;       
    }

    displayStats(){
        var i;
        
        for(i=0; i<this.population.length; i+=1){
            if(this.population[i].safe && this.seen[i] !== 1){
                this.seen[i] = 1;
                this.reachedGoal +=1;
            }
            
        }

        this.ctx = myGameArea.context;
        this.ctx.font = "15px consolas";
        this.ctx.fillStyle = "black";
        this.ctx.text = "SCORE: " + this.reachedGoal + " generation " + this.generation;
        this.ctx.fillText(this.ctx.text, 0, 100);   
    }

    displayFitness(){

        this.ctx = myGameArea.context;
        this.ctx.font = "15px consolas";
        this.ctx.fillStyle = "black";
        this.ctx.text = "populationFitness  " + this.fitnessSum;
        this.ctx.fillText(this.ctx.text, 0, 200);   
    }

    selectParent(){
        var temp = getRandFloat(0,this.fitnessSum);
        var tempSum = 0;
        var i;
        for (i=0; i<this.population.length; i+=1){
            tempSum += this.population[i].calculateFitness();
            if (tempSum > temp){
                return this.population[i];
            }
        }
        return null;
    }

    naturalSelection(){
        this.newPopulation = [];
        var i;
        this.parent = null;
        console.log(this.selectBestDot());
        var champ = this.population[this.selectBestDot()].crossOver();
        this.newPopulation.push(champ);

        for(i=1; i<this.population.length; i+=1){
            this.parent = this.selectParent();
            this.newPopulation.push(this.parent.crossOver());

        }
        this.generation = this.generation+1;
        this.population = this.newPopulation;
        this.population[0].isBest = true;
    }

    selectBestDot(){
        var bestFitness = 0;
        var maxIndex = 0;
        var i;
        for(i=0; i<this.population.length; i+=1){
            if(this.population[i].calculateFitness() > bestFitness){
                bestFitness = this.population[i].calculateFitness();
                maxIndex = i;
            }
        }
        if(this.population[maxIndex].safe){
            this.minStep = this.population[maxIndex].brain.steps;
        }
        
        return maxIndex;
    }

    mutate(){
        var i;
        for (i=1; i<this.population.length; i++){
            this.population[i].brain.mutate();
        }
    }

    resetScore(){
        var i;
        for(i=0; i<this.population.length; i+=1){
            this.seen[i] = 0;
        }
        this.reachedGoal = 0;
    }
}