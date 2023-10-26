class Chicken extends MovableObject{
    height = 100;
    width = 100;
    y = 330;
    speed = 0.2;	
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]
    walking_chicken_sound = new Audio('audio/chicken.mp3');
    


    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 200 + Math.random() * 500;
        this.speed = 0.2 + Math.random() * 0.3;
        this.animate();
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

    play_chicken_sound(){
        this.walking_chicken_sound.play();
    }

}