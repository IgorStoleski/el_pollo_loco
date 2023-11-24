let canvas;
let world;
let keyboard = new Keyboard();

/**
 * Initializes the canvas and creates a new world instance.
 */
function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

/**
 * Starts the game by hiding the start screen, displaying the menu, showing mobile buttons,
 * initializing the game level, and executing initialization steps.
 */
function startGame(){
    hideStartSreen();
    showMenu();
    showMobileBtn();
    initLevel();
    init();
}

/**
 * Hides the start screen element by adding the 'd-none' class.
 */
function hideStartSreen(){
    document.getElementById('start-screen').classList.add('d-none');
}

/**
 * Restarts the game by reloading the current window.
 */
function restartGame(){
    window.location.reload();
}

/**
 * Listens for keydown events and updates the keyboard object accordingly.
 */
window.addEventListener('keydown', (e) => {
    if(e.keyCode == 39){
        keyboard.RIGHT = true;
    }
    if(e.keyCode == 37){
        keyboard.LEFT = true;
    }
    if(e.keyCode == 32){
        keyboard.SPACE = true;
    }
    if(e.keyCode == 38){
        keyboard.UP = true;
    }
    if(e.keyCode == 40){
        keyboard.DOWN = true;
    }
    if(e.keyCode == 68){
        keyboard.KEY_D = true;
    }
    
});

/**
 * Listens for keyup events and updates the keyboard object accordingly.
 */
window.addEventListener('keyup', (e) => {
    if(e.keyCode == 39){
        keyboard.RIGHT = false;
    }
    if(e.keyCode == 37){
        keyboard.LEFT = false;
    }
    if(e.keyCode == 32){
        keyboard.SPACE = false;
    }
    if(e.keyCode == 38){
        keyboard.UP = false;
    }
    if(e.keyCode == 40){
        keyboard.DOWN = false;
    }
    if(e.keyCode == 68){
        keyboard.KEY_D = false;
    }
    
});

/**
 * Enters fullscreen mode by maximizing the screen size.
 */
function fullscreen () {
    let fullscreen = document.getElementById('fullscreen');
    enterFullscreen(fullscreen);
    maxSizeScreen();
}

/**
 * Closes the fullscreen mode and adjusts the screen to a minimum size.
 */
function closeFullscreen () {
    exitFullscreen();
    minSizeScreen();
}

/**
 * Enlarges the screen by adding fullscreen styles to the canvas element
 * and managing visibility of fullscreen control icons.
 */
function maxSizeScreen() {
    document.getElementById('canvas').classList.add('fullscreen');
    document.getElementById('fullscreen-max-img').classList.add('d-none');
    document.getElementById('fullscreen-min-img').classList.remove('d-none');
}

/**
 * Removes fullscreen class and adjusts elements for minimum screen size.
 */
function minSizeScreen() {
    document.getElementById('canvas').classList.remove('fullscreen');
    document.getElementById('fullscreen-max-img').classList.remove('d-none');
    document.getElementById('fullscreen-min-img').classList.add('d-none');
}

/**
 * Enters fullscreen mode for the given HTML element.
 * @param {HTMLElement} element - The HTML element to be displayed in fullscreen mode.
 */
function enterFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.msRequestFullscreen) {      
      element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {  
      element.webkitRequestFullscreen();
    }
}

/**
 * Exits the fullscreen mode if the document is currently in fullscreen.
 */
function exitFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
}

/**
 * Mutes all sounds by setting the muted property to true.
 */
function muteSound() {
    muteImg();
    world.music.muted = true;
    world.coin_sound.muted = true;
    world.bottle_sound.muted = true;
    world.pain_sound.muted = true;
    world.splash_sound.muted = true;
    world.jump_sound.muted = true;
    world.air_sound.muted = true;
    world.walking_sound.muted = true;
}

/**
 * Unmutes all sounds by setting the muted property to false.
 */
function unmuteSound() {
    unmuteImg();
    world.music.muted = false;
    world.coin_sound.muted = false;
    world.bottle_sound.muted = false;
    world.pain_sound.muted = false;
    world.splash_sound.muted = false;
    world.jump_sound.muted = false;
    world.air_sound.muted = false;
    world.walking_sound.muted = false;
}

/**
 * Toggles the visibility of mute and unmute icons for volume control.
 */
function muteImg () {
    document.getElementById('volume-off-img').classList.add('d-none');
    document.getElementById('volume-up-img').classList.remove('d-none');
}

/**
 * Toggles the visibility of mute and unmute icons for volume control.
 */
function unmuteImg () {
    document.getElementById('volume-off-img').classList.remove('d-none');
    document.getElementById('volume-up-img').classList.add('d-none');
}

/**
 * Shows the menu by removing the 'd-none-important' class.
 */
function showMenu() {
    document.getElementById('settings').classList.remove('d-none-important');
}

/**
 * Hide the menu by adding the 'd-none-important' class.
 */
function hideMenu() {
    document.getElementById('settings').classList.add('d-none-important');
}

/**
 * Shows or hides the mobile button based on window width.
 */
function showMobileBtn() {
    let mobileBtn = document.getElementById('hud');
    if (mobileBtn) {
        if (window.innerWidth < 933) {
            mobileBtn.classList.remove('d-none-important');
            mobileBtnTouchEvents();
        } else if (window.innerWidth > 933) {
            mobileBtn.classList.add('d-none-important');
        }
    }
}

/**
 * Sets up touch events for mobile buttons to handle player movements and actions.
 */
function mobileBtnTouchEvents() {
    document.getElementById('walk-left-btn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('walk-left-btn').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
    document.getElementById('walk-right-btn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('walk-right-btn').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
    document.getElementById('jump-btn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('jump-btn').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
    document.getElementById('throw-btn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.KEY_D = true;
    });
    document.getElementById('throw-btn').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.KEY_D = false;
    });
}

