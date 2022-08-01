export class ExtraLife{
  constructor(game){
    this._game = game;
    
    this._width = 50;
    this._height = 50;

    this._speedX = this._game._speed
    this._speedY = 0

    this._x = Math.random() * ((this._game._width - 50) - (this._game._player._x + this._game._player._width)) + (this._game._player._x + this._game._player._width);
    this._y = Math.random() * ((this._game._height - this._game._groundMargin -50) - 0) + 0;

    this._image = document.querySelector('#coinSprite');    


    const spriteWidth = 540
    const spriteHeight = 214










  }
  update(deltaTime){
    this._x -= this._game._speed;

    //CHECK OFF SCREEN
    if (this._x + this._width < 0) this._markedForDeletion = true;
  }
  draw(context){
    //DRAWING LIFE COINS
    context.drawImage(this._image, 0, 0, 108, 107, this._x, this._y, this._width, this._height)
    
  }
}