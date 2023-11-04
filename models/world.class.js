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
    coins = [];
    bottle = [];
    throwableObjects = [];
    bossEnergy = 90;
    
    


    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.coin_sound = new Audio('audio/coin.mp3');
        this.bottle_sound = new Audio('audio/bottle.mp3');
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
            this.checkCoins();
            this.checkBottles();
            this.checkThowObjects();
            this.checkSplashBottle();
        }, 200)
    }

    checkThowObjects() {
        if (this.keyboard.KEY_D) {
            if (this.bottle.length > 0) {
                this.bottleBar.setPercentage(this.bottleBar.percentage - 20); 
                let throwableBottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                this.throwableObjects.push(throwableBottle);
                this.bottle.pop();
            }
        }
    }

    checkCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.coinBar.setPercentage(this.coinBar.percentage + 20); 
                this.coin_sound.play();
                this.level.coins.splice(this.level.coins.indexOf(coin), 1);  
            } 
        });
    }

    checkBottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.bottle.push(bottle); 
                this.bottleBar.setPercentage(this.bottleBar.percentage + 20); 
                this.bottle_sound.play();
                this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
            } 
        });
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy)){
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }    

    checkSplashBottle() {
        this.throwableObjects.forEach((bottle) => {
            if (this.level.enemies[0] && bottle.isColliding(this.level.enemies[0])) {
                console.log('splash');
                bottle.hitBoss = true;
                bottle.breakBottle();
                this.level.enemies[0].bottleHitBoss(); 

            }
        });
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
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