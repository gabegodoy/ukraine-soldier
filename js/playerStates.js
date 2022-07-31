const states = {
  STOPPED: 0,
  RUNNING: 1,
  JUMPING: 2, 
  SHOOTING: 3,
  DEAD: 4
}

class State {
  constructor(state){
    this._state = state;

  } 
}

export class Stopped extends State {
  constructor(player){
    super('STOPPED')
    this._player = player;
  }
  enter(){
    this._player.stopWalking()
  }
  handleInput(input){
    if (input.includes('ArrowLeft') || input.includes('ArrowRight')){
      this._player.setState(states.RUNNING, 2);
    }
    else if (input.includes('ArrowUp')){
      this._player.setState(states.JUMPING, 1);
    }
    else if (input.includes(' ')){
      this._player.setState(states.SHOOTING, .5);
    }
    else if (this._player._game._life === 0){
      this._player.setState(states.DEAD, 0);
    }

  }
}

export class Running extends State {
  constructor(player){
    super('RUNNING')
    this._player = player;
  }
  enter(){
    this._player.walk()

  }
  handleInput(input){
    if (input.includes('ArrowUp')){
      this._player.setState(states.JUMPING, 1);
    }
    else if (input.length == 0){
      this._player.setState(states.STOPPED, 0);
    }
    else if (this._player._game._life === 0){
      this._player.setState(states.DEAD, 0);
    }
  }
}

export class Jumping extends State {
  constructor(player){
    super('JUMPING')
    this._player = player;
  }
  enter(){
    if(this._player.onGround()) this._player._vy -= 25;    
    this._player.jump()
  }
  handleInput(input){
    if (this._player.onGround()) this._player.setState(states.STOPPED, 0)
    else if (this._player._game._life === 0){
      this._player.setState(states.DEAD, 0);
    }
    else if (input.includes('ArrowLeft') || input.includes('ArrowRight') && !this._player.onGround()){
      this._player.setState(states.JUMPING, 1);
    }
    else if (input.includes('ArrowUp') && !this._player.onGround()){
      this._player.setState(states.JUMPING, 1);
    }
    else if (input.includes(' ') && !this._player.onGround()){
      this._player.setState(states.JUMPING, 1);
    } 
  }
  
  
}

export class Shooting extends State {
  constructor(player){
    super('SHOOTING')
    this._player = player;
    this._shots = 0;
  }
  enter(){
    this._shots++
    console.log(this._shots)
    if (this._shots >= 20 &&
        this._player._game._enemies.length > 0){
      

          if (this._player._game._enemies[0]._image.id === 'enemyWalk') {
            
            this._player._game._enemies[0]._image = this._player._game._enemies[0]._images[2]
            this._player._game._enemies[0]._speedX = 0
            this._player._game._enemies[0]._width = 171
            this._player._game._enemies[0]._height = 125
            this._player._game._enemies[0]._y = 340
            this._interval = setInterval(() => {
              this._player._game._enemies[0]._markedForDeletion = true
              clearInterval(this._interval)
              }, 500);
            this._player._enemyDeath.play()
            } 

      this._shots = 0
    
    }
  }
  handleInput(input){
    if (this._player.onGround()) this._player.setState(states.STOPPED, 0)
    else if (this._player._game._life === 0){
      this._player.setState(states.DEAD, 0);
    }
    
  }
}

export class Dead extends State {
  constructor(player){
    super('DEAD')
    this._player = player;
    
  }
  enter(){
    this._player.die()
    //this._player._image = this._player._images[4]
  }
  handleInput(input){
    //if (this._player.onGround()) this._player.setState(states.STOPPED, 0)
    //this._player._currentState

    if (input.includes('ArrowLeft') || input.includes('ArrowRight')){
      this._player.setState(states.DEAD, 0);
    }
    else if (input.includes('ArrowUp')){
      this._player.setState(states.DEAD, 0);
    }
    else if (input.includes(' ')){
      this._player.setState(states.DEAD, 0);
    } 
    
  }
}


