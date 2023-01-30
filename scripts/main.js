/** @type{HTMLCanvasElement} */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const startButton = document.getElementById('start');

const player = new Component(220, 550, 50, 100, "image", ctx); 

startButton.onclick = function (){
    
    const game = new Game(ctx, 1350, 900, player);
    game.start();
    startButton.classList.add('hidden');

backgroundImage.onclick = function (){ 
    const backgroundImage = new Image();
    // backgroundImage.src = "/Images/background.jpg"

    game.start()
    backgroundImage.classList.add('canvas');
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}
}; 


document.addEventListener("keydown", (e) => {
switch(e.code){
    case "ArrowLeft": 
    player.speedX -= 2;
    break;
    case "ArrowRight": 
    player.speedX += 2;
    break; 
    /*case 'ArrowUp':
        player.speedY -= 1;
        break;
      case 'ArrowDown':
        player.speedY += 1;
        break;*/
}
}); 

document.addEventListener("keyup", () => {
    player.speedX = 0; 
    player.speedY = 0; 
});

/*
let mySound = new Audio('my_audio_file.wav')
mySound.play()*/