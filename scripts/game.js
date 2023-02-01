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
    this.winScreen.src = "/Images/YOU WIN.png"
    this.gameOverScreen.src = "../Images/GAME OVER (3).png"
    
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
            
          let randomSize = Math.floor(Math.random() * 150 - 10) + 10;
          let randomX = Math.floor(Math.random() * this.width - randomSize) + randomSize;
    
          this.enemies.push(new Enemy (randomX, 0, 100, 80, "image", this.ctx)
          );
        }
      }

      Score(){
         this.ctx.font = "50px Galaxia"
         this.ctx.fillStyle = 'white';
         const score = Math.floor(this.frames / 50);
         this.ctx.fillText(`Score: ${score}`, canvas.width / 7, 50);
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
       
       this.ctx.drawImage(this.gameOverScreen, 0, 0, 1350, 900) 
            this.ctx.font = '50px, Galaxia';
            this.ctx.fillStyle = 'white';
            this.ctx.fillText(`${score}`, 850, 600);
            themeMusic.pause()
          

        }
      };
      
      checkWin (){
        if (this.bgY >= this.bgYsize ) {
            this.stop ();

            const score = Math.floor(this.frames / 50);
            this.ctx.drawImage(this.winScreen, 0, 0, 1350, 900) 
            this.ctx.font = '50px, Galaxia';
            this.ctx.fillStyle = 'white';
            this.ctx.fillText(`${score}`, 450, 600);
           themeMusic.pause();
          
        }
      } 
 }
    