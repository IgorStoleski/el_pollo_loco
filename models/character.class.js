class Character extends MovableObject{
    height = 300;
    width = 150;
    y = 130;
    speed = 3;
    imageCache = [];
    timeSinceLastInput = 0;
    timeThreshold = 2000;

    offset = {
        top: 120,
        left: 40,
        right: 30,
        bottom: 10
    };
    
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
        'img/2_character_pepe/3_jump/J-31.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];


    world;
    
    /**
     * Represents an instance of a game object.
     */
    constructor(){
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.animate();
        this.checkIdle();
        this.characterAnimation();
    }    

    /**
     * Sets an interval to check for idle keyboard inputs and trigger idle animations accordingly.
     */
    checkIdle() {
    setInterval(() => {
        if(!this.world.keyboard.RIGHT || !this.world.keyboard.LEFT || this.world.keyboard.KEY_D) {
            this.playAnimation(this.IMAGES_IDLE);
            this.playAnimation(this.IMAGES_LONG_IDLE);
        }
    }, 2000);
    }

    /**
    * Initiates an animation loop to update the character's movements.
    * Uses setInterval to repeatedly execute movement functions.
    */
    animate(){                
        setInterval(() => {            
            this.world.walking_sound.pause();
            this.characterMoveRight();
            this.characterMoveLeft();
            this.characterJump();
            
            this.world.camera_x = -this.x + 100;
        }, 1000/60);        
    }    

    /**
     * Runs the character's animation loop based on various states.
     * Uses setInterval to update the animation at regular intervals.
     */
    characterAnimation() {
        setInterval(() => {
            if(this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                world.gameOver();
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if(this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else{
                if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 50);
    }

    /**
     * Moves the character to the right if the right arrow key is pressed
     */
    characterMoveRight() {
        if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            if (!this.isAboveGround()) {
                this.world.walking_sound.play();
            } else {
                this.world.air_sound.play();
            }
        }
    }

    /**
     * Moves the character to the left if the left arrow key is pressed
     */
    characterMoveLeft() {
        if(this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            if (!this.isAboveGround()) {
                this.world.walking_sound.play();
            } else {
                this.world.air_sound.play();
            }                
        }
    }

    /**
     * Makes the character jump if the space bar is pressed
     */
    characterJump() {
        if(this.world.keyboard.SPACE  && !this.isAboveGround()) {
            this.jump();
            this.world.jump_sound.play();
        }       
    }
    
    /**
     * Sets the vertical speed to initiate a jump.
     */
    jump(){
        this.speedY = 30;
    }

    /**
     * Sets the vertical speed to initiate a jump.
     */
    smallJump(){
        this.speedY = 10;
    }       
}