export class Enemy {
  constructor(game){
    this._frameX = 0;
    this._frameY = 0;
    this._fps = 20;
    this._frameInterval = 1000/this._fps;
    this._frameTimer = 0;
    this._markedForDeletion = false;
    this._exploded = false;
  }

  update(deltaTime){
    this._x -= this._speedX + this._game._speed;
    this._y += this._speedY;
    //if (this._frameTimer)

    //CHECK OFF SCREEN
    if (this._x + this._width < 0) this._markedForDeletion = true;
  }

  draw(context){
    if(this._game._debug) context.strokeRect(this._x, this._y, this._width, this._height)
    context.drawImage(this._image, this._x, this._y, this._width, this._height) 
  }
}

export class WalkingEnemy extends Enemy {
  constructor(game){
    super();
    this._game = game;
    this._width = 125.5;
    this._height = 172;
    this._x = game._width;
    //this._y = 255;
    this._y = this._game._height - this._height - this._game._groundMargin;
    this._speedX = Math.random() + 1;
    this._speedY = 0;
    this._maxFrame = 1;
    
    this._images = document.querySelectorAll('#enemyWalk');

    this._image = this._images[0];
    setInterval(() => {
      if (this._image === this._images[0]){
        this._image = this._images[1]
      }
      else if (this._image === this._images[1]){
        this._image = this._images[0]
      }
    }, 250);
  }

  update(deltaTime){
    super.update(deltaTime);

  }


}


export class AirplaneEnemy extends Enemy {
  constructor(game){
    super();
    this._game = game;
    this._width = 242.9;
    this._height = 122.5;
    this._x = game._width;
    this._y = Math.random() * (100 - 0) + 0;
    this._speedX = 6;
    this._speedY = 0;
    this._maxFrame = 5;
    this._airplaneSound = document.getElementById('airplaneSound')
    this._airplaneSound.volume = .1
    this._airplaneSound2 = this._airplaneSound.cloneNode()
    this._airplaneSound2.volume = .1

    
    this._airplaneImage = document.getElementById('enemyAirplane')
    this._explosionImage = document.getElementById('explosion')
    
    this._image = this._airplaneImage;

    if(this._airplaneSound.paused) this._airplaneSound.play()
    else this._airplaneSound2.play()
  }
  
  update(deltaTime){
    super.update(deltaTime);
  }
}


export class LandMine extends Enemy {
  constructor(game){
    super();
    this._game = game;
    this._width = 45;
    this._height = 20;
    this._x = game._width;
    this._y = this._game._height - this._height - this._game._groundMargin - 7;    
    this._speedX = 0
    this._speedY = 0;
    this._maxFrame = 1;
  
    this._explosionSound = document.getElementById('explosionSound')
    this._explosionImage = document.getElementById('explosion')    
    this._landMine = document.getElementById('landMine')
      
    this._image = this._landMine;
  }
  
  update(deltaTime){
    super.update(deltaTime);
  }
}