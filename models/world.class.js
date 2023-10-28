class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    throwableObjects = [];



    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld(){
        this.character.world = this;
    }

    run(){
        setInterval(() => {            
            this.checkCollisions();
            this.checkThowObjects();
        }, 200)
    }

    checkThowObjects() {
        if (this.keyboard.KEY_D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100)
            this.throwableObjects.push(bottle);
            
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy)){
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        
        this.ctx.translate(-this.camera_x, 0);
        // -------- Space for fixed Objects -------------
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.ctx.translate(this.camera_x, 0);
        
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        
        requestAnimationFrame(() => this.draw());
    }

    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo){
        if(mo.otherDirection){
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        

        if(mo.otherDirection){
            this.flipImageBack();
        }
    }

    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.x + mo.width / 2, 0);
        this.ctx.scale(-1, 1);
        this.ctx.translate((mo.x + mo.width / 2) * -1, 0);
    }

    flipImageBack(){
        this.ctx.restore();
    }
    
    

}