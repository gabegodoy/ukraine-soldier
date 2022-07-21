export class Player {
  constructor(game){
    this._game = game;
    this._width = 87.5;
    this._height = 165;
    this._x = 0;
    this._y = this._game._height - this._height;
    this._vy = 0;
    this._weight = 1;
    this._images = document.querySelectorAll('#player'); 
    this._image = this._images[0];
    this._speed = 0;
    this._maxSpeed = 10;
  }

  update(input){
    //HORIZONTAL MOVE
    this._x += this._speed
    if (input.includes('ArrowRight')){ 
      this._speed = this._maxSpeed;      
      
      this.walk()
    }

    else if (input.includes('ArrowLeft')){ 
      this._speed = -this._maxSpeed;
      this.walk()
    }

    else this._speed = 0;
    if (this._x < 0) this._x = 0;
    if (this._x > this._game._width - this._width) this._x = this._game._width - this._width;
  
    //VERTICAL MOVE
    if (input.includes('ArrowUp') && this.onGround()){ 
      this._vy -= 20
      this.jump()
    }
    

    this._y += this._vy;
    if (!this.onGround()) this._vy += this._weight
    else { this._vy = 0 }

  }

  draw(context){
    context.drawImage(this._image, this._x, this._y, this._width, this._height) //14:00
  }
  onGround(){
    return this._y >= this._game._height - this._height
  }
  walk(){
    if (this._image === this._images[0]) this._image = this._images[1]
    else if (this._image === this._images[1]) this._image = this._images[0]
  }
  jump(){
    this._image = this._images[2]
    setTimeout(() => this._image = this._images[0], 650)
  }
}
