class DrawableObject {
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache= {};
    currentImage = 0;
    offset = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    };

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx){
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            console.warn('Image not loaded yet!', e);
            console.log(this.img.src);
        }
    }

    drawFrame(ctx){

        if(this instanceof Character || this instanceof Chicken || this instanceof Small || this instanceof Coins || this instanceof Bottle || this instanceof GroundBottle){
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'red';
            ctx.rect(this.offset.left + this.x,
                this.offset.bottom + this.y,
                this.offset.right,
                this.offset.top);
            ctx.stroke();
        }
    }

    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
        
    }
}