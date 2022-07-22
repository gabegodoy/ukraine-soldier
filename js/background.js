import { Player } from './player.js'

class Layer {
  constructor(game, width, height, speedModifier, image){
    this._game = game;  
    this._width = width;
    this._height = height;
    this._speedModifier = speedModifier;
    this._image = image;
    this._x = 0;
    this._y = 0;
  }

  update(){
    if (this._x < -this._width) this._x = 0;
    else this._x -= this._game._speed * this._speedModifier;
  }

  draw(context){
    context.drawImage(this._image, this._x, this._y, this._width, this._height);
    context.drawImage(this._image, this._x + this._width, this._y, this._width, this._height);
  }
}

export class Background {
  constructor (game){
    this._game = game;
    this._width = 1667;
    this._height = 500;
    this._layer1Image = document.querySelector('#layer1');
    this._layer2Image = document.querySelector('#layer2');
    this._layer3Image = document.querySelector('#layer3');
    this._layer4Image = document.querySelector('#layer4');
    this._layer5Image = document.querySelector('#layer5');
    
    this._layerSpeedWalk = [0, .2, .4, .8, 1]
    this._layerSpeedStop = [0, 0, 0, 0, 0]
    this._layerSpeed = this._layerSpeedWalk;


    this._layer1 = new Layer(this._game, this._width, this._height, this._layerSpeed[0], this._layer1Image);
    this._layer2 = new Layer(this._game, this._width, this._height, this._layerSpeed[1], this._layer2Image);
    this._layer3 = new Layer(this._game, this._width, this._height, this._layerSpeed[2], this._layer3Image);
    this._layer4 = new Layer(this._game, this._width, this._height, this._layerSpeed[3], this._layer4Image);
    this._layer5 = new Layer(this._game, this._width, this._height, this._layerSpeed[4], this._layer5Image);

    this._backgroundLayers = [this._layer1, this._layer2, this._layer3, this._layer4, this._layer5];
  }
  
  update(){
    this._backgroundLayers.forEach(layer => {
      layer.update();
    })
  }
  
  draw(context){
    this._backgroundLayers.forEach(layer => {
      layer.draw(context);
    })
  }
}