/** @type{HTMLCanvasElement} */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const startButton = document.getElementById('start');

const player = new Component(110, 280, 50, 140, "image", ctx);   // change size image

const themeMusic = new Audio ("./audio/xFilesSoundForGame.mp3") // AUDIO 

startButton.onclick = function (){ 
  themeMusic.currentTime=0; 
  themeMusic.play() // Audio
  const game = new Game(ctx, 675, 450, player);
    
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
}
 })


document.addEventListener("keyup", () => {
  player.speedX = 0; 
  player.speedY = 0; 
});

