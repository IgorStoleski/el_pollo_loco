class ThrowableObject extends MovableObject {
    
    
    
    

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
        this.splash_sound = new Audio('audio/bottle_smash.mp3');
    }


    thow(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 30;
        this.applyGravity();        
        setInterval(() => {
            this.x += 10;
        }, 25);
    }

    breakBottle() {
        if (!this.broken) {
            this.broken = true;            
            this.playAnimation(this.SPLASH_IMAGES);
            this.splash_sound.loop = false;
            this.splash_sound.play();
        }
    }

    animation() {
        setInterval(() => {
            if (this.y >= 300 && !this.broken) {
                
                this.breakBottle();
            } else {
                this.playAnimation(this.THROW_IMAGES);
            }
        }, 25);
    }

    
}