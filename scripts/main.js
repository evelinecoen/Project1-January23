/** @type{HTMLCanvasElement} */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const startButton = document.getElementById('start');

const player = new Component(220, 680, 220, 200, "image", ctx);   // change size image


startButton.onclick = function (){ 
    
    const game = new Game(ctx, 1300, 900, player);
    
    game.start();
    startButton.style.display = 'none';
    canvas.classList.remove('hidden');
};

document.addEventListener("keydown", (e) => {
switch(e.code){
    case "ArrowLeft": 
    if (player.x > 0){
      player.speedX -= 2;
    }
    break;
    case "ArrowRight": 
    if (player.x < canvas.width - player.w) {
    player.speedX += 2;
   }
    break; 
    /*case 'ArrowUp':
        player.speedY -= 1;
        break;
      case 'ArrowDown':
        player.speedY += 1;
        break;*/
}
 })

 

document.addEventListener("keyup", () => {
    player.speedX = 0; 
    player.speedY = 0; 
});

