import { Stopped } from "./playerStates.js";
import { Running } from "./playerStates.js";
import { Jumping } from "./playerStates.js";
import { Shooting } from "./playerStates.js";
import { Dead } from "./playerStates.js";

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


    this._fps = 20;
    this._frameInterval = 1000/this._fps;
    this._frameTimer = 0;
    this._speed = 0;
    this._maxSpeed = 1;
    this._states = [new Stopped(this), new Running(this), new Jumping(this), new Shooting (this), new Dead(this)];
    this._currentState = this._states[0];
    this._currentState.enter();
  }
  
  update(input, deltaTime){
    this.checkCollision()
    this._currentState.handleInput(input);

    //HORIZONTAL MOVE
    this._x += this._speed
    if (input.includes('ArrowRight')){ 
      this._speed = this._maxSpeed;         
      //this.walk()
    }
    
    else if (input.includes('ArrowLeft')){ 
      this._speed = -this._maxSpeed;
      //this.walk()
    }
    
    else this._speed = 0;
    
    if (this._x < 0) this._x = 0;
    if (this._x > this._game._width - this._width) this._x = this._game._width - this._width;
    
    if (input.includes(' ') && this.onGround() && !input.includes('ArrowRight')){ 
      this.shoot()
    }

    //VERTICAL MOVE
    /* if (input.includes('ArrowUp') && this.onGround()){ 
      this._vy -= 20
      this.jump()
    } */  
    
    

    this._y += this._vy;
    if (!this.onGround()) this._vy += this._weight
    else { this._vy = 0 }

  }
  
  draw(context){
    if(this._game._debug) context.strokeRect(this._x, this._y, this._width, this._height)
    context.drawImage(this._image, this._x, this._y, this._width, this._height) //14:00
  }
  onGround(){
    return this._y >= this._game._height - this._height -this._game._groundMargin
  }
  walk(){
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
  stopWalking(){
    clearInterval(this._walkInterval)
  }
  jump(){
    this._image = this._images[2]
    this._jump.play()
    setTimeout(() => this._image = this._images[0], 815)
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
    this._game._groundMargin = 70;
    this._image = this._images[4]
    this._maxSpeed = 0
    // AUDIO this._death.play()
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
                 
          
          //this._game._score++;        
          enemy._markedForDeletion = true;
          this._game._life--
          
          if (this._game._life <= 0){
            console.log('death')
            this.setState(4, 0)
          }
      }

/*       else{

      } */
    });
  }
  killEnemy(enemy){
    console.log(enemy)
    
    //this._image = this._images[2]
    
    //setInterval(enemy._markedForDeletion = true, 10000)
  }
}
