import { Canvas2D } from './Canvas2D';

const CANVAS_SIZE = 500;

export class CanvasRenderer {
  constructor($element, gameInfoProvider) {
    this.$element = $element;
    this.ctx = $element.getContext('2d');
    this.canvas = new Canvas2D(this.ctx, CANVAS_SIZE);

    this.ctx.canvas.height = CANVAS_SIZE;
    this.ctx.canvas.width = CANVAS_SIZE;

    this.gameInfoProvider = gameInfoProvider;
  }

  renderObjects = () => {
    this.canvas.clear();
    for (let object of this.gameInfoProvider.currentLevel.getObjects()) {
      const { x, y } = object.getPosition();
      this.canvas.square(x, y, 10, object.color);
    }
  };
}
