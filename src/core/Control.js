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
  up = (delta) => {
    this.gameObject.setPosition(this.gameObject.x, this.gameObject.y - this.speed * delta);
  };
  down = (delta) => {
    this.gameObject.setPosition(this.gameObject.x, this.gameObject.y + this.speed * delta);
  };
  left = (delta) => {
    this.gameObject.setPosition(this.gameObject.x - this.speed * delta, this.gameObject.y);
  };
  right = (delta) => {
    this.gameObject.setPosition(this.gameObject.x + this.speed * delta, this.gameObject.y);
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
  handleInput = (e, delta) => {
    const key = String(e.key).toLowerCase();
    switch (key) {
      case 'w':
        this.up(delta);
        break;
      case 'a':
        this.left(delta);
        break;
      case 's':
        this.down(delta);
        break;
      case 'd':
        this.right(delta);
        break;
    }
  };
}
