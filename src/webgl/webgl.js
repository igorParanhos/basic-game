import { createShader, createProgram, setRectangle } from './utils'
import vsSource from './shaders/square.vert?raw'
import fsSource from './shaders/square.frag?raw'


export class WebGL {
  _gl = null;
  _program = null;

  constructor(gl) {
    this._gl = gl;
    this.initializeShaders(vsSource, fsSource);
    this.initialize()
  }

  initializeShaders(vertexShaderSource, fragmentShaderSource) {
    const vertexShader = createShader(this._gl, this._gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(this._gl, this._gl.FRAGMENT_SHADER, fragmentShaderSource);

    this._program = createProgram(this._gl, vertexShader, fragmentShader);
  }

  initialize() {
    this._gl.viewport(0, 0, this._gl.canvas.width, this._gl.canvas.height);

    const positionAttributeLocation = this._gl.getAttribLocation(this._program, "a_position");
    this._resolutionUniformLocation = this._gl.getUniformLocation(this._program, "u_resolution");

    this._positionBuffer = this._gl.createBuffer();
    this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._positionBuffer);

    this._vao = this._gl.createVertexArray();
    this._gl.bindVertexArray(this._vao);

    this._gl.enableVertexAttribArray(positionAttributeLocation);
    this._colorLocation = this._gl.getUniformLocation(this._program, "u_color");

    const size = 2;                       // 2 components per iteration
    const type = this._gl.FLOAT;          // the data is 32bit floats
    const normalize = false;              // don't normalize the data
    const stride = 0;                     // 0 = move forward size * sizeof(type) each iteration to get the next position
    const offset = 0;                     // start at the beginning of the buffer
    this._gl.vertexAttribPointer(
      positionAttributeLocation, size, type, normalize, stride, offset)

    this._gl.useProgram(this._program);
    this._gl.uniform2f(this._resolutionUniformLocation, this._gl.canvas.width, this._gl.canvas.height);
  }

  clear() {
    this._gl.clearColor(0, 0, 0, 0);
    this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
  }

  _drawSquare(x, y, color) {
    setRectangle(this._gl, x, y, 10, 10);

    this._gl.uniform4f(this._colorLocation, ...color, 1);

    // Draw the rectangle.
    const primitiveType = this._gl.TRIANGLES;
    const offset = 0;
    const count = 6;
    this._gl.drawArrays(primitiveType, offset, count);
  }

  draw(objects, delta) {
    this.clear();
    this._gl.useProgram(this._program);
    this._gl.bindVertexArray(this._vao);
    this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._positionBuffer);
    for (const object of objects) {
      const { x, y } = object.getPosition(delta);
      let color = object.color.rgb.map(v => v / 255)
      this._drawSquare(x, y, color);
    }
  }
}
