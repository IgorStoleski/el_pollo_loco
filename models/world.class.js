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
    coin_sound = new Audio('audio/coin.mp3');
    bottle_sound = new Audio('audio/bottle.mp3');
    pain_sound = new Audio('audio/pain.mp3');
    music = new Audio('audio/mexico.mp3');
    jump_sound = new Audio('audio/jump.mp3');
    air_sound = new Audio('audio/air.mp3');
    splash_sound = new Audio('audio/bottle_smash.mp3');
    walking_sound = new Audio('audio/walking.mp3');
    win_sound = new Audio('audio/win.mp3');
    you_lose = new Audio('audio/you_lose.mp3');

    /**
     * Represents an instance of a game object.
     */
    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.drawStatusBars();
        this.setWorld();
        this.run();
    }

    /**
     * Sets the world for the character.
     */
    setWorld(){
        this.character.world = this;
    }

    /**
     * Runs the game.
     */
    run(){
        this.music.play();
        setInterval(() => {            
            this.checkCollisions();
            this.checkCoins();
            this.checkBottles();
            this.checkThowObjects();
            this.checkSplashBottle();
            this.checkCollisionsBoss();
        }, 200)
    }

    /**
     * Check if the character has throwable objects.
     */
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

    /**
     * Check if the character has coins.
     */
    checkCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.coinBar.setPercentage(this.coinBar.percentage + 20); 
                this.coin_sound.play();
                this.level.coins.splice(this.level.coins.indexOf(coin), 1);  
            } 
        });
    }

    /**
     * Check if the character has bottles.
     */
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

    /**
     * Check if the character has collided with an enemy.
     */
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
 
    /**
     * Check if the character has collided with the boss.
     */
    checkCollisionsBoss() {
        if(this.character.isColliding(this.endBoss)){
            this.character.hit();
            this.pain_sound.play();
            this.statusBar.setPercentage(this.character.energy);
        }
        
    } 

    /**
     * Check if the bottle has collided with the boss.
     */
    checkSplashBottle() {
        this.throwableObjects.forEach((bottle) => {
            if (this.endBoss && bottle.isColliding(this.endBoss) && !bottle.hitBoss) {
                bottle.hitBoss = true;
                bottle.breakBottle();
                this.endBoss.bottleHitBoss();
                this.statusBarEndboss.setPercentage(this.endBoss.bossEnergy);
            }
        });
    }
    
    /**
     * Initializes the game over screen or you lost screen.
     */
    gameOver() {
        if (this.endBoss.bossIsDead()) {
            muteSound();
            document.getElementById('end-screen').classList.remove('d-none');
            document.getElementById('settings').classList.add('d-none-important');
            this.win_sound.loop = false;
            this.win_sound.play();             
        } else {
            muteSound();
            document.getElementById('you-lost').classList.remove('d-none');
            document.getElementById('settings').classList.add('d-none-important');
            this.you_lose.loop = false;
            this.you_lose.play();
        }
    }
    
    /**
     * Draws the game.
     */
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
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        requestAnimationFrame(() => this.draw());
    }

    /**
     * Draws the status bars.
     */
    drawStatusBars() {
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);        
        this.addToMapFlip(this.statusBarEndboss);          
        this.addToMap(this.endbossIcon);        
        requestAnimationFrame(() => this.drawStatusBars());
    }

    /**
     * Adds multiple objects to the map.
     * @param {Array<Object>} objects - An array of objects to be added to the map.
     */
    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds a movable object to the map and handles its direction.
     * @param {MovableObject} mo - The movable object to add.
     */
    addToMap(mo){
        if(mo.otherDirection){
            this.flipImage(mo);
        }
        mo.draw(this.ctx);       
        if(mo.otherDirection){
            this.flipImageBack();
        }
    }

    /**
     * Flips and adds the provided graphical element to the canvas map.
     */
    addToMapFlip(mo){
        this.ctx.save();
        this.ctx.translate(mo.x + mo.width / 2, 0);
        this.ctx.scale(-1, 1);
        this.ctx.translate((mo.x + mo.width / 2) * -1, 0);
        mo.draw(this.ctx);
        this.ctx.restore();
    }

    /**
     * Flips an image horizontally around its center.
     */
    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.x + mo.width / 2, 0);
        this.ctx.scale(-1, 1);
        this.ctx.translate((mo.x + mo.width / 2) * -1, 0);
    }

    /**
     * Flips an image horizontally back.
     */
    flipImageBack(){
        this.ctx.restore();
    }
}