import { STATUS, GAME_STATUS } from './constants';
import { $level, $result, $startButton, $stopButton } from './elements';

export const handleResult = (state) => {
  let message, className;
  switch (state) {
    case STATUS.FAIL:
      className = ['animate', 'fail'];
      message = 'YOU FAILED!';
      break;
    case STATUS.SUCCESS:
      className = ['animate', 'success'];
      message = 'YOU WON!';
      break;
    case STATUS.NEXT_LEVEL:
      className = ['animate', 'info'];
      message = 'NEXT LEVEL!';
      break;
    case null:
      className = [];
      message = '';
      break;
  }
  $result.classList.remove('animate', 'info', 'success', 'fail');
  $result.classList.add(...className);
  $result.children[0].innerHTML = message;
};

export const handleLevel = (level) => {
  $level.innerHTML = `Level: ${level}`;
};

export const handleGameStatus = (status) => {
  switch (status) {
    case GAME_STATUS.PLAYING:
      $startButton.disabled = true;
      $stopButton.disabled = false;
      break;
    case GAME_STATUS.STOPPED:
      $startButton.disabled = false;
      $stopButton.disabled = true;
      break;
  }
};
