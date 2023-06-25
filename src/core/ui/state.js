import Singleton from '../../utils/Singleton';
import { handleGameStatus, handleLevel, handleResult } from './handlers';

export class UIState extends Singleton {
  level = 0;
  status = null;
  gameStatus = null;

  setLevel = (level) => {
    this.level = level;
    handleLevel(level, this);
  };
  setResult = (status) => {
    this.status = status;
    handleResult(status, this);
  };
  setGameStatus = (status) => {
    this.gameStatus = status;
    handleGameStatus(status, this);
  };
}
const _instance = new UIState();
export default _instance;
