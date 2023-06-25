import { WebGL } from "../webgl";

const CANVAS_SIZE = 500;

export class WebGLRenderer {
  constructor($element, gameInfoProvider) {
    this.$element = $element;
    this.ctx = $element.getContext('webgl2');
    this.gl = this.ctx;

    if (!this.ctx) window.alert('WebGL not available');

    this.ctx.canvas.height = CANVAS_SIZE;
    this.ctx.canvas.width = CANVAS_SIZE;

    this.gameInfoProvider = gameInfoProvider;
    this._webgl = new WebGL(this.gl)
  }

  renderObjects = (delta) => {
    this._webgl.draw(this.gameInfoProvider.currentLevel.getObjects(), delta)
  }
}
