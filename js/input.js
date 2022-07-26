export class InputHandler {
  constructor(game){

    this._game = game;
    this._keys = [];

    window.addEventListener('keydown', (element) => {

       if ((element.key === 'ArrowUp' ||
            //element.key === 'ArrowDown' ||
            element.key === 'ArrowRight' ||
            element.key === 'ArrowLeft' ||
            element.key === ' ') 
          && this._keys.indexOf(element.key) === -1) { 
        
            this._keys.push(element.key);
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