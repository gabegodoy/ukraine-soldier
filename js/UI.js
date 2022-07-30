export class UI{
  constructor(game){
    this._game = game;
    this._fontSIze = 30;

    this._width = 30;
    this._height = 30;
    this._x = 30;
    this._y = 30;
    this._image = document.querySelector('#life')

  }
  draw(context){

     if ( this._game._life === 1){
      context.drawImage(this._image, this._x, this._y, this._width, this._height)
    }
    else if (this._game._life === 2){
      context.drawImage(this._image, this._x, this._y, this._width, this._height)
      context.drawImage(this._image, this._x+40, this._y, this._width, this._height)
    } 
    if (this._game._life === 3){
      context.drawImage(this._image, this._x, this._y, this._width, this._height)
      context.drawImage(this._image, this._x+40, this._y, this._width, this._height)
      context.drawImage(this._image, this._x+80, this._y, this._width, this._height)
    }
    
  }
}