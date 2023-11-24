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

    /**
     * Loads an image from the specified path.
     * @param {string} path - The path to the image file.
     */
    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws an image on the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
     */
    draw(ctx){
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            console.warn('Image not loaded yet!', e);
            console.log(this.img.src);
        }
    }

    /**
     * Loads images from an array of paths into the image cache.
     * @param {string[]} arr - An array of image paths to load.
     */
    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });        
    }
}