class ThrowableObject extends MovableObject {
    hitBoss = false;
    world;
    

    THROW_IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    SPLASH_IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    /**
     * Represents an instance of a game object.
     */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.THROW_IMAGES);
        this.loadImages(this.SPLASH_IMAGES);
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 100;
        this.broken = false;
        this.thow(x, y);
        this.animation();
    }

    /**
     * Throws an object with initial coordinates (x, y).
     * @param {number} x - The initial x-coordinate.
     * @param {number} y - The initial y-coordinate.
     */
    thow(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 30;
        this.applyGravity();        
        setInterval(() => {
            this.x += 10;
        }, 25);
    }

    /**
     * Checks if the bottle is broken.
     */
    breakBottle() {
        if (!this.broken) {
            this.broken = true;            
            this.playAnimation(this.SPLASH_IMAGES);
            world.splash_sound.play();
        }
    }

    /**
     * Initiates an animation sequence for the bottle, causing it to rotate or display splash animation.
     */
    animation() {
        setInterval(() => {
            if (this.y >= 300 || this.hitBoss) {                
                this.breakBottle();
            } else {
                this.playAnimation(this.THROW_IMAGES);
            }
        }, 25);
    }    
}