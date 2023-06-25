import { Level0 } from './Level0';
import { Level1 } from './Level1';
import { Level2 } from './Level2';
import { Level3 } from './Level3';
import { Level4 } from './Level4';

export class LevelFactory {
  constructor() {
    this.levels = [Level0, Level1, Level2, Level3, Level4];
  }
  buildLevel = (level) => {
    return new this.levels[level]();
  };
}
