class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 45;
    firstContact = false;
    speed = 0.4;
    world;
    bossWalk = null;

    offset = {
        left: 10,
        right: 0,
        top: 0,
        bottom: 0
    };

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    /**
     * Represents an instance of a game object.
     */
    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK);
        this.x = 2500;
        this.firstBossContact();
        this.bossAnimation();
    }

    /**
     * Updates the boss's position and triggers walking animation.
     */
    bossWalkingLogic() {
        this.x -= this.speed ;
        this.playAnimation(this.IMAGES_WALKING);
    }

    /**
     * Start the boss walking animation.
     */
    startBossWalk() {
        this.bossWalkInterval = setInterval(() => {
            this.bossWalkingLogic();
        }, 10 / 25);
    }

    /**
     * Stop the boss walking animation.
     */
    stopBossWalk() {
        clearInterval(this.bossWalkInterval);
    }

    /**
     * Checks first contact with the boss.
     */
    firstBossContact() {
        setInterval(() => {
            if (world.character.x > 2000 && !this.firstContact) {
                this.firstContact = true;
                this.startBossWalk();
            } else if (this.firstContact) {
                this.playAnimation(this.IMAGES_ATTACK);     
            }
        }, 200);
    }

    /**
    * Executes an animation loop for the boss character.
    * The animation changes based on the boss's status (hurt, dead, or alert).
    * Uses setInterval to repeatedly update the animation.
    */
    bossAnimation() {
        setInterval(() => {
            if (this.isHurt()) {
                this.hurtAnimation();
            } else if (this.bossIsDead()) {
                this.bossIsDeadAnimation();
            } else {
                this.playAnimation(this.IMAGES_ALERT);
            }
        }, 200);
    }

    /**
     * Checks if the boss is hurt.
     */
    hurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
        this.stopBossWalk();
        setTimeout(() => {
            this.startBossWalk();
        }, 100);
    }

    /**
     * Checks if the boss is dead.
     */
    bossIsDeadAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        this.stopBossWalk();
        setTimeout(() => {
            document.getElementById('settings').classList.add('d-none-important');
            world.gameOver(); 
        }, 1000);
    }  
}