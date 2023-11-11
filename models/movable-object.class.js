class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    bossEnergy = 100;
    lastHit = 0;

    offset = { 
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    };


    applyGravity(){
        setInterval(() =>{
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround(){
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 130 ;
        }
    }

    isColliding (mo) {
        return  this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
                this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
                this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
                this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    hit() {
        if (this.energy > 0) {
            this.energy -= 5;
            if (this.energy < 0) {
                this.energy = 0;
            }
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

    bottleHitBoss() {
        if (this.bossEnergy > 0) {
            this.bossEnergy -= 25;
            this.lastHit = new Date().getTime();
        }
    }

    bossIsDead() {
        return this.bossEnergy == 0;
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