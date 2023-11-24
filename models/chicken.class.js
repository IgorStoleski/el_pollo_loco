class Chicken extends MovableObject{
    height = 80;
    width = 80;
    y = 340;
    speed = 0.2;	
    energy = 10;
    isDying = false;

    offset = {
        left: 30,
        right: 30,
        top: 0,
        bottom: 0
    };

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ];

    walking_chicken_sound = new Audio('audio/chicken.mp3');
    
    /**
     * Represents an instance of a game object.
     */
    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        
        this.x = 500 + Math.random() * 2000;
        this.speed = 0.2 + Math.random() * 0.3;
        this.animate();
    }

    /**
     * Initiates a walking sound for the chicken.
     */
    chickenWalk = setInterval(() => {
        this.x -= this.speed;
    }, 1000 / 60)

    /**
     * Initiates an animation sequence for the chicken.
     * Uses setInterval to repeatedly play walking animation frames,
     * stopping if the chicken is dying to load the dead chicken image.
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