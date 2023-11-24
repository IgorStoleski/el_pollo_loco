class GroundBottle extends DrawableObject {
    height = 100;
    width = 100;
    
    offset = {
        left: 40,
        right: 40,
        top: 80,
        bottom: 10
    };

    IMAGE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png'
    ];

    /**
     * Represents an instance of a game object.
     */
    constructor() {
        super().loadImage(this.IMAGE);
        this.x = 300 + Math.random() * 1800;
        this.y = 325;
    }
}