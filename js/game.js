let canvas;
let world;
let keyboard = new Keyboard();

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function startGame(){
    hideStartSreen();
    showVolume();
    showMobileBtn();
    initLevel();
    init();
}

function hideStartSreen(){
    document.getElementById('start-screen').classList.add('d-none');
}

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

function gameOver() {
    document.getElementById('end-screen').classList.remove('d-none');

}

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

function muteImg () {
    document.getElementById('volume-off-img').classList.add('d-none');
    document.getElementById('volume-up-img').classList.remove('d-none');
}

function unmuteImg () {
    document.getElementById('volume-off-img').classList.remove('d-none');
    document.getElementById('volume-up-img').classList.add('d-none');
}

function showVolume() {
    document.getElementById('settings').classList.remove('d-none-important');
}

function hideVolume() {
    document.getElementById('settings').classList.add('d-none-important');
}

function showMobileBtn() {
    let mobileBtn = document.getElementById('hud');
    if (mobileBtn) {
        if (window.innerWidth < 721) {
            mobileBtn.classList.remove('d-none-important');
            mobileBtnTouchEvents()
        } else if (window.innerWidth > 721) {
            mobileBtn.classList.add('d-none-important');
        }
    }
}

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

function checkOrientation() {
    if (window.matchMedia("(orientation: landscape)").matches) {
        if (window.innerHeight < 480) {
            newHeight = window.innerHeight;
            document.getElementById('canvas').style.height = `${newHeight}px`;
        }
    }
    else {
        document.getElementById('canvas').style.height = `100%`;
    }
}