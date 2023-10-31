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
        this.thow(x, y);
        
    }


    thow(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 30;
        this.applyGravity();        
        setInterval(() => {
            this.playAnimation(this.THROW_IMAGES);
            this.x += 10;
        }, 25);
    }

    splashBottle() {
        if (this.bottle.isColliding(this.world.level.enemies.Endboss)) {
            this.playAnimation(this.SPLASH_IMAGES);
        }
    }
}