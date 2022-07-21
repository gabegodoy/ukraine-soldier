import { Player } from './player.js'
import { InputHandler } from "./input.js";


window.addEventListener('load', function(){
  const canvas = this.document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = 500;
  canvas.height = 500;
  
  class Game{
    constructor(width, height){
      this._width = width;
      this._height = height;
      this._player = new Player(this);
      this._input = new InputHandler();
    }

    update(){
      this._player.update(this._input._keys)
    }

    draw(context){
      this._player.draw(context)
    }


  }
  
  
  const game = new Game(canvas.width, canvas.height)
  console.log(game)

  function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    game.update();
    game.draw(ctx);
    requestAnimationFrame(animate)
    
  }
  animate()

})




/* 
class Person {
  constructor(name) {
    this._name = name
    this._newName = name
    this._nickName = name + 'zinho'
  }
}

let person = new Person('Pedro')


function Person (name){
  this._name = name
  this._newName = name
  this._nickName = name + 'zinho'


}

let person = new Person('Pedro')
 */