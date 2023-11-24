class Bottle extends DrawableObject {
    height = 100;
    width = 100;

    offset = {
        left: 30,
        right: 30,
        top: 80,
        bottom: 10
    };

    IMAGE = [
        'img/6_salsa_bottle/salsa_bottle.png'
    ];

    /**
     * Represents an instance of a game object.
     */
    constructor() {
        super().loadImage(this.IMAGE);
        this.x = 300 + Math.random() * 1800;
        this.y = 30 + Math.random() * 300;
    }
}