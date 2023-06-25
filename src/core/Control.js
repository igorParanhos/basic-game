import { addPressHoldEventButton, addPressHoldEventKeypress } from '../utils/pressHoldEvent';

const $up = document.querySelector('#up');
const $down = document.querySelector('#down');
const $left = document.querySelector('#left');
const $right = document.querySelector('#right');

export class Control {
  constructor(gameObject, speed = 2) {
    this.gameObject = gameObject;
    this.speed = speed;
    this._cancellationTokens = [];
  }
  start = () => {
    this.addListeners();
  };
  stop = () => {
    this.cancelListenerEvents();
  };
  up = () => {
    console.log('up');
    this.gameObject.setPosition(this.gameObject.x, this.gameObject.y - this.speed);
  };
  down = () => {
    this.gameObject.setPosition(this.gameObject.x, this.gameObject.y + this.speed);
  };
  left = () => {
    this.gameObject.setPosition(this.gameObject.x - this.speed, this.gameObject.y);
  };
  right = () => {
    this.gameObject.setPosition(this.gameObject.x + this.speed, this.gameObject.y);
  };
  addListeners = () => {
    this._cancellationTokens.push(addPressHoldEventKeypress(document, this.handleInput));
    this._cancellationTokens.push(addPressHoldEventButton($up, this.up));
    this._cancellationTokens.push(addPressHoldEventButton($down, this.down));
    this._cancellationTokens.push(addPressHoldEventButton($left, this.left));
    this._cancellationTokens.push(addPressHoldEventButton($right, this.right));
  };
  cancelListenerEvents = () => {
    for (let cancelEvent of this._cancellationTokens) {
      cancelEvent();
    }
  };
  handleInput = (e) => {
    const key = String(e.key).toLocaleLowerCase();
    switch (key) {
      case 'w':
        this.up();
        break;
      case 'a':
        this.left();
        break;
      case 's':
        this.down();
        break;
      case 'd':
        this.right();
        break;
    }
  };
}
