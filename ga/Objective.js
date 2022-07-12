class Objective{
    constructor(x,y,height,width){
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }
    show(){
        this.ctx = myGameArea.context;
        this.ctx.globalAlpha = 0.5;
        this.ctx.fillStyle = "green"; 
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}