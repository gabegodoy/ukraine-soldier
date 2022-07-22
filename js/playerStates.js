const states = {
  STOPPED: 0,
  RUNNING: 1,
  JUMPING: 2, 
  SHOOTING: 3,
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
  }
}

export class Running extends State {
  constructor(player){
    super('RUNNING')
    this._player = player;
  }
  enter(){
    //this._player.walk()
  }
  handleInput(input){
    if (input.includes('ArrowUp')){
      this._player.setState(states.JUMPING, 1);
    }
    else if (input.length == 0){
      this._player.setState(states.STOPPED, 0);
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
    
  }
}

export class Shooting extends State {
  constructor(player){
    super('SHOOTING')
    this._player = player;
  }
  enter(){
    //this._player.shoot();
  }
  handleInput(input){
    if (this._player.onGround()) this._player.setState(states.STOPPED, 0)
    
  }
}


