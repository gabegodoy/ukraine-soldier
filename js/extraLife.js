export class ExtraLife{
  constructor(game){
    this._game = game;
    
    this._width = 50;
    this._height = 50;

    this._speedX = this._game._speed;
    this._speedY = 0;

    this._x = this._game._width;
    this._y = Math.random() * ((this._game._height - this._game._groundMargin -50) - 0) + 0;
    this._image = document.querySelector('#coinSprite');    

    //SPRITE ANIMATION
    this._spriteWidth = 145;
    this._spriteHeight = 138;
    this._frameX = 1;
    this._maxFrame = 9;
    this._gameFrame = 0;
    this._staggerFrames = 6;

  }
  update(deltaTime){
    this._x -= this._game._speed;

    //SPRITE ANIMATION
    if(this._gameFrame % this._staggerFrames === 0){
      
      if (this._frameX === this._maxFrame) this._frameX = 1
      else {this._frameX++}
    }
    this._gameFrame++
    

    //CHECK OFF SCREEN
    if (this._x + this._width < 0) this._markedForDeletion = true;
  }
  draw(context){
    //DRAWING LIFE COINS
    context.drawImage(this._image, this._frameX * this._spriteWidth, 0, this._spriteWidth, this._spriteHeight, this._x, this._y, this._width, this._height)     
  }
}