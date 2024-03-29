class BottleBar extends DrawableObject {
    bottles = [];

    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];

    percentage = 0;

    /**
     * Represents an instance of a game object.
     */
    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 90;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
     * Sets the percentage and updates the image accordingly.
     * @param {number} percentage - The new percentage value.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
      
    }

    /**
     * Resolves the image index based on the percentage value.
     */
    resolveImageIndex() {
        if (this.percentage == 0 ) {
            return 0;
        } else if (this.percentage == 20) {
            return 1;
        } else if (this.percentage == 40) {
            return 2;
        } else if (this.percentage == 60) {
            return 3;
        } else if (this.percentage == 80) {
            return 4;
        } else if (this.percentage == 100) {
            return 5;
        }
    }
}