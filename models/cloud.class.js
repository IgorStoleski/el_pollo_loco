class Cloud extends MovableObject{
    y = 20;
    width  = 500;
    height = 300;

    /**
     * Represents a Cloud object.
     * @param {number} zone - The zone number for positioning the cloud.
     */
    constructor(zone){
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = this.generateRandomXPositionForZone(zone);        
        this.animate();
    }

    /**
     * Generates a random x-position within a specified zone.
     * @param {number} zone - The zone number (1, 2, or 3).
     */
    generateRandomXPositionForZone(zone){
        let minX, maxX;
        if(zone === 1){
            minX = 0;
            maxX = 719;
        } else if(zone === 2){
            minX = 720;
            maxX = 1439;
        } else if(zone === 3){
            minX = 1440;
            maxX = 2159;
        }
        return Math.random() * (maxX - minX) + minX;
    }

    /**
     * Initiates an animation sequence for the cloud.
     */
    animate(){
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60)
    }

    
}