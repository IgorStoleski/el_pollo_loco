class Level{
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2200;
    coins;
    bottles;

    /**
     * Represents an instance of a game object.
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}