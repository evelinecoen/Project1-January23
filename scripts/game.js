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

    }
    
    start(){ 
        this.intervalId = setInterval(this.update, 1000/60); 
    }
    
    update = () => { 
        this.frames++
        this.clear();
        this.player.newPosition();
        this.player.draw();
        this.updateEnemies(); 
        this.Score();
        this.checkGameOver();
        this.gameOver(message);

    }
    
    stop(){ 
    clearInterval(this.intervalId);
    }
    
    clear(){
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
    
    updateEnemies(){
        for(let i = 0; i < this.enemies.length; i++){
            this.enemies[i].y += 3;
            this.enemies[i].draw(); 
        }
    
        
        if(this.frames % 200 === 0){
            
          let randomSize = Math.floor(Math.random() * 150 - 10) + 10;
          let randomX = Math.floor(Math.random() * this.width - randomSize) + randomSize;
    
          this.enemies.push(new Enemy (randomX, 0, randomSize, randomSize, "image", this.ctx)
          );
        }
      }
      Score(){
         this.ctx.font = "25px Arial";
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
            this.stop();

            /*this.ctx.src = "/Images/elon-mars-final.png";*/
            this.ctx.fillRect(0, 0, canvas.width, 200);
            this.ctx.font = '46px, sans-serif';
            this.ctx.fillStyle = 'red';
            this.ctx.fillText(`Game Over!`, 50, 50)
            this.ctx.lineWidth = 1;
            this.ctx.fillStyle = 'black';
            this.ctx.fillText(`Your final score: ${score}`, 80, 100);
            this.ctx.lineWidth = 1;
            this.ctx.fillStyle = 'white';
        
        }
      };
 }
    