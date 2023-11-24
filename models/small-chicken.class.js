class Small extends MovableObject {
    height = 60;
    width = 60;
    y = 360;
    speed = 0.2;	
    isDying = false;

    offset = {
        left: 20,
        right: 20,
        top: 0,
        bottom: 0
    };

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    /**
     * Represents an instance of a game object.
     */
    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 500 + Math.random() * 2000;
        this.speed = 0.2 + Math.random() * 0.3;
        this.animate();
    }

    /**
     * Moves the object to the left by updating its x property.
     */
    chickenWalk = setInterval(() => {
        this.x -= this.speed;
    }, 1000 / 60)

    /**
     * Initiates an animation sequence for the chicken, causing it to walk or display death animation.
     */
    animate(){
        this.chickenWalk;
        setInterval(() => {
            if(!this.isDying) {
                this.playAnimation(this.IMAGES_WALKING);                
            } else {
                clearInterval(this.chickenWalk);
                this.loadImage(this.IMAGES_DEAD);
            }            
        }, 200);
    }

    /**
     * Sets the chicken to dying state.
     */
    chickenIsDead() {
        this.isDying = true;
    }
}