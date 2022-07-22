import { Player } from './player.js'
import { InputHandler } from "./input.js";
import { Background } from "./background.js";


window.addEventListener('load', function(){
  const canvas = this.document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');
  const backgroundSound = this.document.querySelector('#backgroundSound')



  canvas.width = 1000;
  canvas.height = 500;
  
  class Game{
    constructor(width, height){
      this._width = width;
      this._height = height;
      this._speed = 0;
      this._groundMargin = 75;
      this._player = new Player(this);
      this._background = new Background(this);
      this._input = new InputHandler();
    }
    
    update(deltaTime){
      this._background.update();
      this._player.update(this._input._keys, deltaTime)
    }

    draw(context){
      this._background.draw(context);
      this._player.draw(context)
    }


  }
  
  
  const game = new Game(canvas.width, canvas.height)
  let lastTime = 0;

  function animate(timeStamp){
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(animate)
    
  }
  animate(0)

})
