function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}
function getRandFloat(min, max){
    return (Math.random() * (max - min) + min);
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