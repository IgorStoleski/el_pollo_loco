class Coins extends DrawableObject {
    height = 100;
    width = 100;

    IMAGE = [
        'img/8_coin/coin_1.png'
    ];

    constructor() {
        super().loadImage(this.IMAGE);
        this.x = 200 + Math.random() * 1800;
        this.y = 50 + Math.random() * 300;

    }


}