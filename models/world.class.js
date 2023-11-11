class World {
    character = new Character();
    endBoss = new Endboss();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    statusBarEndboss = new StatusBarEndboss();
    endbossIcon = new EndbossIcon();
    coins = [];
    bottle = [];
    throwableObjects = [];
    
    
    


    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.coin_sound = new Audio('audio/coin.mp3');
        this.bottle_sound = new Audio('audio/bottle.mp3');
        this.pain_sound = new Audio('audio/pain.mp3');
        this.music = new Audio('audio/mexico.mp3');
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld(){
        this.character.world = this;
    }

    run(){
        //this.music.play();
        setInterval(() => {            
            this.checkCollisions();
            this.checkCoins();
            this.checkBottles();
            this.checkThowObjects();
            this.checkSplashBottle();
            this.checkCollisionsBoss();
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
            if(!enemy.isDying && this.character.isColliding(enemy) && this.character.isAboveGround()){
                enemy.chickenIsDead();
                this.character.smallJump();
                setTimeout(() => {
                    this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
                }, 500);    
            } else if (!enemy.isDying && this.character.isColliding(enemy)) {
                this.character.hit();
                this.pain_sound.play();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }
 
    checkCollisionsBoss() {
        if(this.character.isColliding(this.endBoss)){
            this.character.hit();
            this.pain_sound.play();
            this.statusBar.setPercentage(this.character.energy);
        }
        
    } 

    checkSplashBottle() {
        this.throwableObjects.forEach((bottle) => {
            if (this.endBoss && bottle.isColliding(this.endBoss)) {
                bottle.hitBoss = true;
                bottle.breakBottle();
                this.endBoss.bottleHitBoss(); 
                this.statusBarEndboss.setPercentage(this.endBoss.bossEnergy);
            }
        });
    }

    

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.endBoss);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);
        
        this.ctx.translate(-this.camera_x, 0);
        // -------- Space for fixed Objects -------------
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);        
        this.addToMapFlip(this.statusBarEndboss);          
        this.addToMap(this.endbossIcon);        
        // ----------------------------------------------
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
        mo.drawInnerFrame(this.ctx);
        

        if(mo.otherDirection){
            this.flipImageBack();
        }
    }

    addToMapFlip(mo){
        this.ctx.save();
        this.ctx.translate(mo.x + mo.width / 2, 0);
        this.ctx.scale(-1, 1);
        this.ctx.translate((mo.x + mo.width / 2) * -1, 0);
        mo.draw(this.ctx);
        this.ctx.restore();
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