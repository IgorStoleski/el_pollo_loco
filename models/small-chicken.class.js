class Small extends MovableObject {
    height = 60;
    width = 60;
    y = 360;
    speed = 0.2;	
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 500 + Math.random() * 2000;
        this.speed = 0.2 + Math.random() * 0.3;
        //this.animate();
    }

    animate(){
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60)
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
            //this.walking_chicken_sound.play();
        }, 200);

    }



}