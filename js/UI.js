export class UI{
  constructor(game){
    this._game = game;
    this._fontSize = 20;
    this._fontFamily = 'Helvetica';

    this._width = 30;
    this._height = 30;
    this._x = 30;
    this._y = 30;
    this._image = document.querySelector('#life')

  }
  draw(context){

    //DRAWING SCORE
    context.font = this._fontSize + 'px ' + this._fontFamily;
    context.textAlign = 'Left';
    context.fillStyle = this._game._fontColor;
    context.fillText('Score: ' + this._game._score + '/20', this._game._width - 130 ,30)

    //DRAWING LIFE HEARTS
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