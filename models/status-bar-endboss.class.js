class StatusBarEndboss extends DrawableObject {
    

    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    IMAGE_BOSS_HEALTH_ICON = [
        'img/7_statusbars/3_icons/icon_health_endboss.png'
    ];

    percentage = 100;

    /**
     * Represents an instance of a game object.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.x = 500;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Sets the percentage and updates the image accordingly.
     * @param {number} percentage - The new percentage value.
     */
    setPercentage(percentage) {
        if (percentage >= 0) {
            this.percentage = percentage;
            let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
            this.img = this.imageCache[path];
        }
    }

    /**
     * Resolves the image index based on the percentage value.
     */
    resolveImageIndex() {
        if (this.percentage == 100 ) {
            return 4;
        } else if (this.percentage == 75) {
            return 3;
        } else if (this.percentage == 50) {
            return 2;
        } else if (this.percentage == 25) {
            return 1;
        } else if (this.percentage == 0) {
            return 0;
        } 
    }
}