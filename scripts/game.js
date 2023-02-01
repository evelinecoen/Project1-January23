/** @type{HTMLCanvasElement} */

class Game{
    constructor(ctx, width, height, player){
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.player = player;
    this.intervalId = null; 
    this.frames = 0; 
    this.enemies = [];
    this.bgY = 900
    this.bgYsize = 2000
    this.gameOverScreen = new Image ()
    this.winScreen = new Image ()
    this.winScreen.src = "/Images/YOUWIN NEW.png"
    this.gameOverScreen.src = "../Images/GAME OVER NEW (4).png"
    
    }
    
    start(){ 
        this.intervalId = setInterval(this.update, 1000/60); 
    } 
    
    update = () => { 
        this.frames++
        if (this.bgY <= this.bgYsize ){
            this.bgY += 0.7 // change background frame
        }
        this.clear();
        this.player.newPosition();
        this.player.draw();
        this.player.boundaries();
        this.updateEnemies(); 
        this.Score();
        this.checkWin();
        this.checkGameOver();
        
    } 
    
    stop(){ 
    clearInterval(this.intervalId);
    }
    
    clear(){
        
        let background = new Image ()
        background.src= "../Images/NEWbackground.png";
        this.ctx.drawImage(background, 0, this.bgY, canvas.width, - this.bgYsize);
    }
    
    updateEnemies(){
        for(let i = 0; i < this.enemies.length; i++){
            this.enemies[i].y += 7;  // to make faster enemies
            this.enemies[i].draw(); 
        }
        if(this.frames % 50 === 0){
            
          let randomSize = Math.floor(Math.random() * 180 - 10) + 10;
          let randomX = Math.floor(Math.random() * this.width - randomSize) + randomSize;
    
          this.enemies.push(new Enemy (randomX, 0, 100, 80, "image", this.ctx)
          );
        }
      }

      Score(){
         this.ctx.font = "50px Galaxia"
         this.ctx.fillStyle = 'orange';
         const score = Math.floor(this.frames / 50);
         this.ctx.fillText(`Score: ${score}`, canvas.width / 10, 50);
         this.ctx.lineWidth = 1;
      }
    
      checkGameOver(){
        const crashed = this.enemies.some((enemy) => {
          return this.player.crashWith(enemy); 
        });
        const score = Math.floor(this.frames / 50);
        if (crashed) {
            
          startButton.style.display = 'block'; 
          startButton.style.position = 'absolute'; 
          startButton.style.top = '20px'; 
 
          this.stop();
          const explosionSound = new Audio ("/audio/docs_assets_sounds_Som Explosão 1.mp3")
          explosionSound.play()
            
          this.ctx.drawImage(this.gameOverScreen, 0, 0, 1350, 900) 
          this.ctx.font = '50px, Galaxia';
          this.ctx.fillStyle = 'white';
          this.ctx.fillText(`${score}`, 850, 600);
          themeMusic.pause()
        
        }
      };
      
      checkWin (){
        if (this.bgY >= this.bgYsize ) {
          startButton.style.display = 'block'; 
          startButton.style.position = 'absolute'; 
          startButton.style.top = '20px';
          this.stop ();

           /*
            const winSound = new Audio ("/audio/crowd-cheer-ii-6263.mp3");
            winSound.play();*/
          

          const score = Math.floor(this.frames / 50);
          this.ctx.drawImage(this.winScreen, 0, 0, 1350, 900) 
          this.ctx.font = '50px, Galaxia';
          this.ctx.fillStyle = 'white';
          this.ctx.fillText(`${score}`, 450, 720);
          themeMusic.pause();
            /*winSound.pause();*/
        
        }
      } 
 }
    