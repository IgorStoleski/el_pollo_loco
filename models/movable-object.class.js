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

    /**
     * Applies gravity to an object by updating its vertical position and speed.
     */
    applyGravity(){
        setInterval(() =>{
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above ground level.
     */
    isAboveGround(){
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 130 ;
        }
    }

    /**
     * Checks if the current object is colliding with another object.
     * @param {Object} mo - The other object to check collision against.
     */
    isColliding (mo) {
        return  this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
                this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
                this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
                this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Reduce the energy of the object by 5.
     */
    hit() {
        if (this.energy > 0) {
            this.energy -= 5;
            if (this.energy < 0) {
                this.energy = 0;
            }
            this.lastHit = new Date().getTime();
        }
    }    

    /**
     * Checks if the entity is currently hurt based on the time elapsed since the last hit.
     */
    isHurt(){
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    /**
     * Checks if the entity is currently dead.
     */
    isDead(){
        return this.energy == 0;
    }   

    /**
     * Reduce the energy of the boss by 25.
     */
    bottleHitBoss() {
        if (this.bossEnergy > 0) {
            this.bossEnergy -= 25;
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Boss is dead.
     */
    bossIsDead() {
        return this.bossEnergy == 0;
    }

    /**
     * Plays an animation using the provided array of image paths.
     * @param {string[]} images - Array of image paths to be used in the animation.
     */
    playAnimation(images){
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft(){
        this.x -= this.speed;
    }
}