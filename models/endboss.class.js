class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 45;
    world;

    offset = {
        left: 10,
        right: 0,
        top: 0,
        bottom: 0
    };

    IMAGES_WALKING = [
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


    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2500;
        this.animate();
    }


    animate() {
        setInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.bossIsDead()) {
                this.playAnimation(this.IMAGES_DEAD);                
                document.getElementById('settings').classList.add('d-none-important');
                this.gameOver();                
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }

    gameOver() {
        document.getElementById('end-screen').classList.remove('d-none');
        world.win_sound.loop = false;
        world.win_sound.play();  
    }

}