export class Boss{
  constructor(game){
    this._game = game;
    
    this._width = 212;
    this._height = 198;

    this._speedX = 3;
    this._speedY = 0;


    this._x = -this._width;
    this._y = Math.random() * ((this._game._height - this._game._groundMargin - this._height) - 0) + 0;
    this._image = document.querySelector('#putinAirplane');    
    this._winSound = document.querySelector('#winSound');

    this._angle = 0;
    this._va = Math.random() * .1 + .1;   
  }
  update(deltaTime){
    if(this._game._score >= 20){
    
     this._x += this._speedX;
     this._angle += this._va
     this._y -= Math.sin(this._angle)
     this._y -= .6
      
     this._winSound.play()

     //GAME OVER
     setInterval(() => {
       this._game._gameOver = true;
      
     }, 6000);
     

     //CHECK OFF SCREEN
     if (this._x >= this._game._width) this._markedForDeletion = true;
    } 
  }
  
  draw(context){
    context.drawImage(this._image, this._x, this._y, this._width, this._height);
    //this._game._airplaneEnemy._airplaneSound.play()
    
  }
}