import { Stopped } from "./playerStates.js";
import { Running } from "./playerStates.js";
import { Jumping } from "./playerStates.js";
import { Shooting } from "./playerStates.js";
import { Dead } from "./playerStates.js";
import { Explosion } from "./explosion.js";

export class Player {
  constructor(game){
    this._game = game;
    this._width = 87.5;
    this._height = 165;
    this._x = 0;
    this._y = (this._game._height - this._height - this._game._groundMargin);
    this._vy = 0;
    this._weight = 1;
    console.log(this._game._enemy)

    this._images = document.querySelectorAll('#player'); 
    this._image = this._images[0];

    this._shot = document.querySelector('#shotSound')
    this._step1 = document.querySelector('#step1Sound')
    this._step1.playbackRate = 1.4
    this._step1.volume = .6
    this._step2 = document.querySelector('#step2Sound')
    this._step2.playbackRate = 1.4
    this._step2.volume = .6
    this._jump = document.querySelector('#jumpSound')
    this._jump.volume = .3
    this._enemyDeath = document.querySelector('#enemyDeath')
    this._playerDeath = document.querySelector('#loseGame')
    this._playerLostLife = document.querySelector('#loseLife')
    this._extraLife = document.querySelector('#extraLife')


    this._fps = 20;
    this._frameInterval = 1000/this._fps;
    this._frameTimer = 0;
    this._speed = 0;
    this._maxSpeed = .8;
    this._states = [new Stopped(this._game), new Running(this._game), new Jumping(this._game), new Shooting (this._game), new Dead(this._game)];

  }
  
  update(input, deltaTime){
    this.checkCollision()
    this._currentState.handleInput(input);

    //HORIZONTAL MOVE
    this._x += this._speed
    if (input.includes('ArrowRight')){ 
      this._speed = this._maxSpeed;         
    }
    
    else if (input.includes('ArrowLeft')){ 
      this._speed = -this._maxSpeed;
    }
    
    else this._speed = 0;
    
    if (this._x < 0) this._x = 0;
    if (this._x > this._game._width - this._width) this._x = this._game._width - this._width;
    
    if (input.includes(' ') && 
        this.onGround() && 
        !input.includes('ArrowRight') &&
        !input.includes('ArrowLeft') &&
        this._game._player._currentState._state !== 'DEAD'
        ){ 
      this.shoot()
    }

    
    this._y += this._vy;
    if (!this.onGround()) this._vy += this._weight
    else { this._vy = 0 }

  }
  
  draw(context){
    //if(this._game._debug) context.strokeRect(this._x, this._y, this._width, this._height)
    context.drawImage(this._image, this._x, this._y, this._width, this._height) //14:00
  }
  onGround(){
    return this._y >= this._game._height - this._height -this._game._groundMargin
  }
  walk(){
    if (this._game._player._currentState._state !== 'DEAD'){
      this._walkInterval = setInterval(() => {
        
        if (this._image === this._images[0]){
          this._step1.play()
          this._image = this._images[1] 
        }
        else if (this._image === this._images[1]){ 
          this._step2.play()
          this._image = this._images[0]
        }
      }, 120);
    }
  }
  stopWalking(){
    this._image = this._images[0]
    clearInterval(this._walkInterval)
  }
  jump(){
    this._image = this._images[2]
    this._jump.play()
    //setTimeout(() => this._image = this._images[0], 815)
  }
  shoot(){
    this._width = 215
    this._image = this._images[3]
    this._shot.play()
    
    setTimeout(() => this._image = this._images[0], 20) 
    setTimeout(() => this._width = 87.5, 20)
  }
  die(){
    this._width = 168
    this._height = 90.5
    this._game._groundMargin = 68;
    this._image = this._images[4]
    this._maxSpeed = 0
    this._playerDeath.play()
  }
  setState(state, speed){
    this._currentState = this._states[state]
    this._game._speed = speed
    this._currentState.enter();
    
  }
  checkCollision(){
    this._game._enemies.forEach(enemy => {
      
      this._defaultWidth = 87.5;
      
      if(
        enemy._x < this._x + this._defaultWidth &&
        enemy._x + enemy._width > this._x &&
        enemy._y < this._y + this._height &&
        enemy._y + enemy._height > this._y
        ){
          if(enemy._image.id === 'landMine'){
            enemy._exploded = true
            this._game._life--
            this._playerLostLife.play()
            this._game._landMine._explosionSound.play()
          }
         
           else if (enemy._image.id !== 'landMine'){

            enemy._markedForDeletion = true;
            this._game._life--
            this._playerLostLife.play()
          }             
          
          if (this._game._life <= 0){
            this.setState(4, 0)
          }
      }
    });


    this._game._lifeCoin.forEach(coin => {
      
      
      if(
        coin._x < this._x + this._width &&
        coin._x + coin._width > this._x &&
        coin._y < this._y + this._height &&
        coin._y + coin._height > this._y &&
        this._game._life < 3 
        ){         
          coin._markedForDeletion = true;
          this._game._life++
          this._extraLife.play();
      }

    });
  
  
  
  
  
  
  }

}
