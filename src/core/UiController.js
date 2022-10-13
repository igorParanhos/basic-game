import Singleton from "../utils/Singleton";

export class UiController extends Singleton {
  constructor() {
    super()
    this.$result = document.querySelector('#result')
  }

  setResult = (status) => {
    let message, className;
    switch (status) {
      case 'fail':
        className = status;
        message = 'YOU FAILED!';
        break;
      case 'success':
        className = status;
        message = 'YOU WON!';
        break;
      case 'next-level':
        className = 'info';
        message = 'NEXT LEVEL!';
        break;
    }
    this.$result.classList.remove('animate', 'info', 'success', 'fail');
    this.$result.classList.add('animate', className);
    this.$result.children[0].innerHTML = message;
  };
  setLevel = (level) => {
    const $level = document.querySelector('#level');
    $level.innerHTML = `Level: ${level}`;
  };
}
const _instance = new UiController()
export default _instance
