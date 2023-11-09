class EndbossIcon extends DrawableObject {

    ENDBOSS_ICON = [
        'img/7_statusbars/3_icons/icon_health_endboss.png'
    ];

    constructor() {
        super();
        this.loadImage(this.ENDBOSS_ICON);
        this.x = 650;
        this.y = 5;
        this.width = 60;
        this.height = 60;
    }
}