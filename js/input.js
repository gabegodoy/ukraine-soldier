export class InputHandler {
  constructor(game){

    const backgroundSound = document.querySelector('#backgroundSound')
    backgroundSound.volume = .5

    this._game = game;
    this._keys = [];

    window.addEventListener('keydown', (element) => {
      backgroundSound.play()

       if ((element.key === 'ArrowUp' ||
            //element.key === 'ArrowDown' ||
            element.key === 'ArrowRight' ||
            element.key === 'ArrowLeft' ||
            element.key === ' ') 
          && this._keys.indexOf(element.key) === -1) { 
        
            this._keys.push(element.key);
      } 
      else if(element.key === 'd') {
        this._game._debug = !this._game._debug;
      }
      
    })

    window.addEventListener('keyup', (element) => {

      if (element.key === 'ArrowUp' ||
          //element.key === 'ArrowDown' ||
          element.key === 'ArrowRight' ||
          element.key === 'ArrowLeft' ||
          element.key === ' ') { 
       
           this._keys.splice(this._keys.indexOf(element.key), 1);
     } 
     
   })

    

  }
}