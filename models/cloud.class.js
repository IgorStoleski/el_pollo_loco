class Cloud extends MovableObject{
    y = 20;
    width  = 500;
    height = 300;

    constructor(zone){
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = this.generateRandomXPositionForZone(zone);
        
        this.animate();
    }

    generateRandomXPositionForZone(zone){
        let minX, maxX;

        // Abhängig von der Zone, setze die Grenzen für die X-Position
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

    animate(){
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60)
    }

    
}