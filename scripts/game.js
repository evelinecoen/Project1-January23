/** @type{HTMLCanvasElement} */


class Game{
    constructor(ctx, width, height, player){
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.player = player;
    // this.player.boundaries = boundaries;
    this.intervalId = null; 
    this.frames = 0; 
    this.enemies = [];
    this.bgY = 900
    this.bgYsize = 2000
    this.gameOverScreen = new Image ()
    }
    
    start(){ 
        this.intervalId = setInterval(this.update, 1000/60); 
    } 
    
    
    update = () => { 
        this.frames++
        if (this.bgY <= this.bgYsize ){
            this.bgY += 0.3
        }
        this.clear();
        this.player.newPosition();
        this.player.draw();
        this.player.boundaries();
        this.updateEnemies(); 
        this.Score();
        this.checkWin();
        this.checkGameOver();
        //this.gameOver();

    } 
    
    stop(){ 
    clearInterval(this.intervalId);
    }
    
    clear(){
        /* this.ctx.clearRect(0, 0, this.width, this.height); */
        let background = new Image ()
        background.src= "../Images/NEWbackground.png";
        this.ctx.drawImage(background, 0, this.bgY, canvas.width, - this.bgYsize);
    }
    
    updateEnemies(){
        for(let i = 0; i < this.enemies.length; i++){
            this.enemies[i].y += 3;  // to make faster enemies
            this.enemies[i].draw(); 
        }

    /* 
          */ 
        
        if(this.frames % 100 === 0){
            
          let randomSize = Math.floor(Math.random() * 150 - 10) + 10;
          let randomX = Math.floor(Math.random() * this.width - randomSize) + randomSize;
    
          this.enemies.push(new Enemy (randomX, 0, 100, 80, "image", this.ctx)
          );
        }
      }

/*
      explode(x,y){
        let explosion = new Image()
        explosion.src= "/Images/explosion2.png"
        this.ctx.drawImage(explosion,x,y,200,200) 
        audio4.play()

    }*/

      Score(){
         this.ctx.font = "30px Arial";
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
            
            

       this.gameOverScreen.src = "../Images/elonmusksad.png"
       this.ctx.drawImage(this.gameOverScreen, 0, 0, 1350, 900) 
            /*this.ctx.src = "/Images/elon-mars-final.png";*/
            //this.ctx.fillRect(0, 0, canvas.width, 200);
            this.ctx.font = '46px, sans-serif';
            //this.ctx.fillStyle = 'red';
            //this.ctx.fillText(`Game Over!`, 50, 50)
            //this.ctx.lineWidth = 1;
            this.ctx.fillStyle = 'white';
            this.ctx.fillText(`Your final score: ${score}`, 80, 100);
            //this.ctx.lineWidth = 1;
            //this.ctx.drawImage 
           /* this.ctx.fillStyle = 'white';*/
           this.stop();
        
        }
      };
      
      checkWin (){
        if (this.bgY >= this.bgYsize ) {
            this.stop ();

            this.ctx.fillRect(0, 0, canvas.width, 200);
            this.ctx.font = '46px, sans-serif';
            this.ctx.fillStyle = 'red';
            this.ctx.fillText(`YOU WIN!`, 50, 50)
            this.ctx.lineWidth = 1;
            this.ctx.fillStyle = 'black';
            this.ctx.fillText(`Your final score: ${score}`, 80, 100);
            this.ctx.lineWidth = 1;
        }
      } 
 }
    