class Coins extends DrawableObject {
    height = 100;
    width = 100;

    offset = {
        left: 30,
        right: 30,
        top: 30,
        bottom: 30
    };

    IMAGE = [
        'img/8_coin/coin_1.png'
    ];

    /**
     * Represents an instance of a game object.
     */
    constructor() {
        super().loadImage(this.IMAGE);
        this.x = 200 + Math.random() * 1800;
        this.y = 50 + Math.random() * 300;
    }
}