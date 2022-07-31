const states = {
  STOPPED: 0,
  RUNNING: 1,
  JUMPING: 2, 
  SHOOTING: 3,
  DEAD: 4
}

class State {
  constructor(state, game){
    this._state = state;
    this._game = game;
  } 
}

export class Stopped extends State {
  constructor(game){
    super('STOPPED', game)
  }
  enter(){
    this._game._player.stopWalking()
  }
  handleInput(input){
    if (input.includes('ArrowLeft') || input.includes('ArrowRight')){
      this._game._player.setState(states.RUNNING, 2);
    }
    else if (input.includes('ArrowUp')){
      this._game._player.setState(states.JUMPING, 1);
    }
    else if (input.includes(' ')){
      this._game._player.setState(states.SHOOTING, .5);
    }
    else if (this._game._life === 0){
      this._game._player.setState(states.DEAD, 0);
    }

  }
}

export class Running extends State {
  constructor(game){
    super('RUNNING', game)
  }
  enter(){
    this._game._player.walk()
  }
  handleInput(input){
    if (input.includes('ArrowUp')){
      this._game._player.setState(states.JUMPING, 1);
    }
    else if (input.length == 0){
      this._game._player.setState(states.STOPPED, 0);
    }
    else if (this._game._life === 0){
      this._game._player.setState(states.DEAD, 0);
    }
  }
}

export class Jumping extends State {
  constructor(game){
    super('JUMPING', game)
  }
  enter(){
    if(this._game._player.onGround()) this._game._player._vy -= 25;    
    this._game._player.jump()
  }
  
  handleInput(input){
    if (this._game._life === 0){
      this._game._player.setState(states.DEAD, 0);
    }
    else if (this._game._player.onGround()) this._game._player.setState(states.STOPPED, 0)
/* 
    else if (input.includes('ArrowLeft') || input.includes('ArrowRight') && !this._game._player.onGround()){
      this._game._player.setState(states.JUMPING, 1);
    }
    else if (input.includes('ArrowUp') && !this._game._player.onGround()){
      this._game._player.setState(states.JUMPING, 1);
    }
    else if (input.includes(' ') && !this._game._player.onGround()){
      this._game._player.setState(states.JUMPING, 1);
    } 
 */
  }
  
  
}

export class Shooting extends State {
  constructor(game){
    super('SHOOTING', game)
    this._shots = 0;
  }
  enter(){
    this._firstEnemy = this._game._enemies[0]
    this._shots++

    if (this._shots >= 20 &&
        this._game._enemies.length > 0){

      if (this._firstEnemy._image.id === 'enemyWalk') {
        
        this._game._score++; 
        this._game._player._enemyDeath.play()

        this._firstEnemy._image = this._firstEnemy._images[2]
        this._firstEnemy._speedX = 0
        this._firstEnemy._width = 171
        this._firstEnemy._height = 125
        this._firstEnemy._y = 340
        this._interval = setInterval(() => {
          this._firstEnemy._markedForDeletion = true
          clearInterval(this._interval)
          }, 500);
      } 

      this._shots = 0
    
    }
  }
  handleInput(input){
    if (this._game._player.onGround()) this._game._player.setState(states.STOPPED, 0)
    else if (this._game._life === 0){
      this._game._player.setState(states.DEAD, 0);
    }
    
  }
}

export class Dead extends State {
  constructor(game){
    super('DEAD', game)    
  }
  enter(){
    this._game._player.die()
  }
  handleInput(input){
    
  }
}


