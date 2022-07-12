class Brain{
    constructor(size){
        this.directions = [];
        this.steps = 0;
        var i;

        for (i=0; i<size; i+=1){
            this.directions.push(new Vector(1*flip(0,1)*Math.random(), 1*flip(0,1)*Math.random()));
        }

    }

    cloneBrain(){
        var i;
        this.clone = new Brain(this.directions.length);

        for(i=0; i<this.directions.length; i+=1) {
            this.clone.directions[i] = this.directions[i];
        }
        return this.clone;   
    }

    mutate(){
        var mutaRate = mutationRate;
        var i;
        var howManyChanges = this.directions.length * mutaRate;
        var tempArray = [];
        for (i=0 ;i<howManyChanges; i++){
            tempArray.push(new Vector(1*flip(0,1)*Math.random(), 1*flip(0,1)*Math.random()));
        }

        for (i=0; i<howManyChanges; i++){
            var indexToBeChanged = getRandomInt(0,this.directions.length);
            this.directions[indexToBeChanged] = tempArray[i];
        }
    }
    
}