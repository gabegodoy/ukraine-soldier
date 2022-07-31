import { Player } from './player.js'
import { InputHandler } from "./input.js";
import { Background } from "./background.js";
import { WalkingEnemy } from "./enemies.js";
import { AirplaneEnemy } from "./enemies.js";
import { Enemy } from "./enemies.js";
import { UI } from "./UI.js";


window.addEventListener('load', function(){
  const canvas = this.document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');



  canvas.width = 1000;
  canvas.height = 500;
  
  class Game{
    constructor(width, height){
      this._width = width;
      this._height = height;
      this._speed = 0;
      this._groundMargin = 75;
      this._enemy = new Enemy(this);
      this._walkingEnemy = new WalkingEnemy(this);
      this._airplaneEnemy = new AirplaneEnemy(this);
      this._player = new Player(this);
      this._background = new Background(this);
      this._input = new InputHandler(this);
      this._UI = new UI(this);
      this._enemies = [];
      this._enemyTimer = 0;
      this._enemyInterval = 2000;
      this._debug = true;
      this._score = 0;
      this._life = 3;
      this._fontColor = '#0057b7';
    }
    
    update(deltaTime){
      this._background.update();
      this._player.update(this._input._keys, deltaTime)
      
      // Enemies      
      if (this._enemyTimer > this._enemyInterval) {
        this.addEnemy();
        this._enemyTimer = 0;
      }
      else {this._enemyTimer += deltaTime}

      this._enemies.forEach(enemy => {
        enemy.update(deltaTime)
        if (enemy._markedForDeletion) this._enemies.splice(this._enemies.indexOf(enemy), 1)
      })

    }

    draw(context){
      this._background.draw(context);
      this._enemies.forEach(enemy => {
        enemy.draw(context)
      })
      this._player.draw(context);
      this._UI.draw(context);
    }

    addEnemy(){
      if(this._speed > 0) this._enemies.push(new WalkingEnemy(this))
      if(Math.random() < 0.5) this._enemies.push(new AirplaneEnemy(this))
      console.log(this._enemies)
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
