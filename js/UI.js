export class UI{
  constructor(game){
    this._game = game;
    this._fontSize = 30;
    this._fontFamily = "Bangers";

    this._width = 30;
    this._height = 30;
    this._x = 30;
    this._y = 30;
    this._image = document.querySelector('#life')

    //this._timer = document.querySelector('#timer');
    //this._timerCount = 10;

    this.__gameOverBackground = document.querySelector('.game-over__background');
  }
  draw(context){

    //DRAWING SCORE
    context.font = this._fontSize + 'px ' + this._fontFamily;
    context.textAlign = 'Left';
    context.fillStyle = this._game._fontColor;
    context.fillText('Score: ' + this._game._score + '/20', this._game._width - 160 ,40)

    //DRAWING LIFE HEARTS
     if ( this._game._life === 1){
      context.drawImage(this._image, this._x, this._y, this._width, this._height)
    }
    else if (this._game._life === 2){
      context.drawImage(this._image, this._x, this._y, this._width, this._height)
      context.drawImage(this._image, this._x+40, this._y, this._width, this._height)
    } 
    else if (this._game._life === 3){
      context.drawImage(this._image, this._x, this._y, this._width, this._height)
      context.drawImage(this._image, this._x+40, this._y, this._width, this._height)
      context.drawImage(this._image, this._x+80, this._y, this._width, this._height)
    }


    //DRAWING GAME OVER
     if(this._game._gameOver){
    
      console.log('Game over')
      if(this._game._score >= 20){
        console.log('You win')
        
        //WIN MESSAGE
      }
      else{
        console.log('You Lost')
        //TRY AGAIN
        //PRINT GAME OVER
        this.__gameOverBackground.style.display = 'flex'
        //DRAWING TIMER
        //this._timer.innerHTML = this._timerCount
        startTimer()
      }
    }
  }
  
  
  
  
  
}

const timer = document.querySelector('#timer');
let timerCount = 10;


export function startTimer(){
  let timerStart = setInterval(() => {
    timerCount --
    timer.innerHTML = timerCount
    if (timerCount === 0) clearInterval(timerStart)
  }, 1000);
}