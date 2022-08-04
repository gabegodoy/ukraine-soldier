export class Explosion{
  constructor(game, enemyX){
    this._game = game;
    
    this._width = 530;
    this._height =490;

    this._speedX = this._game._speed;
    this._speedY = 0;

    this._x = enemyX - 265
    this._y = this._game._height - this._height - this._game._groundMargin - 5;    

    this._image = document.querySelector('#explosionSprite');    

    //SPRITE ANIMATION
    this._spriteWidth = 534;
    this._spriteHeight = 490;
    this._frameX = 1;
    this._maxFrame = 5;
    this._gameFrame = 0;
    this._staggerFrames = 12;

  }

  update(deltaTime){
    this._x -= this._game._speed;
    
  }
  draw(context){
    
        //SPRITE ANIMATION
        if(this._gameFrame % this._staggerFrames === 0){
          
          if (this._frameX === this._maxFrame) this._frameX = 1
          else {this._frameX++}
        }
        this._gameFrame++
        
    //DRAWING BOMB EXPLOSION
    context.drawImage(this._image, this._frameX * this._spriteWidth, 0, this._spriteWidth, this._spriteHeight, this._x, this._y, this._width, this._height)     
  }
}