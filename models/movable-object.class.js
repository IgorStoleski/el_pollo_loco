class MovableObject{
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache= [];
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;

    lastHit = 0;


    applyGravity(){
        setInterval(() =>{
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround(){
        return this.y < 30;
    }

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    
    drawFrame(ctx){

        if(this instanceof Character || this instanceof Chicken){
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    isColliding(mo){
        return this.x + this.width > mo.x
            && this.y + this.height > mo.y
            && this.x < mo.x
            && this.y < mo.y + mo.height;
    }

    hit(){
        this.energy -= 5;
        if(this.energy <= 0){
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt(){
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    isDead(){
        return this.energy == 0;
    }   

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
        
    }

    playAnimation(images){
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft(){
        this.x -= this.speed;
    }

    
}