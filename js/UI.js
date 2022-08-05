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
/*   get game (){
    return this._game._tryAgain()
  } */
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

      this.__gameOverBackground.style.display = 'flex'
      startTimer()
      
      if(this._game._score >= 20){
        console.log('You win')
          
        //WIN MESSAGE
        this._gameOverTittle = document.querySelector('.game-over__tittle')
        this._gameOverWinSubtitle = document.querySelector('.game-over__underTittle')
        this._gameOverImage = document.querySelectorAll('.game-over__image')

        this._gameOverTittle.innerHTML = 'Congrats!'
        this._gameOverWinSubtitle.style.display = 'block'
        this._gameOverImage.forEach(image => image.src = 'assets/images/life.png')           
      }
      else{
        console.log('You Lost')
        //TRY AGAIN
        //PRINT GAME OVER
        //DRAWING TIMER
        //this._timer.innerHTML = this._timerCount

      }
    }
  }
    
}




//TIMER CONFIG AND PRINT
const timer = document.querySelector('#timer');
let timerCount = 10;

export function startTimer(){
  let timerStart = setInterval(() => {
    timerCount --
    timer.innerHTML = timerCount
    if (timerCount === 0){
      gameOverBackground.style.display = 'none'
      donationSummaryBackground.style.display = 'flex'
      clearInterval(timerStart)
    } 
  }, 1000);
}



//DONATION SUMMARY
const donationSummaryBackground = document.querySelector('.donation__summary__background');
const donatinoBackground = document.querySelector('.donation__background');
const closeSummaryButton = document.querySelector('#closeSummary');

closeSummaryButton.addEventListener('click', () => {
  donationSummaryBackground.style.display = 'none'
  donatinoBackground.style.display = 'flex'
})



//GAME OVER - YES/NO BUTTON
const gameOverBackground = document.querySelector('.game-over__background');
const gameOverBtn = document.querySelectorAll('#gameOverBtn');

gameOverBtn.forEach(button => {
  button.addEventListener('click', () =>{
    if(button.innerHTML === 'yes') {
      window.location.href = "index.html";  
    }
    else if(button.innerHTML === 'no') {
      gameOverBackground.style.display = 'none'
      donationSummaryBackground.style.display = 'flex' 
    }
  }) 
});


//TRY AGAIN
//const UI = new UI(game)