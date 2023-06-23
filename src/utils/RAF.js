import Observer from './Observer'

export class RAF extends Observer {
  constructor() {
    super()
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.tick = this.tick.bind(this);
    this._startTime = null;
    this._ticks = 0;
    this.time = null;
  }

  emit = this._emit('tick')
  subscribe = this._on('tick')
  unsubscribe = this._cancel('tick')

  start = () => {
    this.isPaused = false;
    this._startTime = new Date().getTime();
    this._ticks = 0;
    this.tick(this.time);
  }
  pause = () => {
    this.isPaused = true;
  }
  tick = (now) => {
    this._ticks++;

    const n = new Date().getTime();
    const elapsed = n - this._startTime;
      // console.log('FPS', this._ticks / elapsed * 1000);
      // console.log('elapsed', elapsed);

      console.log('FPS', this._ticks / elapsed * 1000);

    let delta = 0;

    if (this.time)
      delta = now - this.time;

    this.time = now;

    if (!this.isPaused) {
      this.emit({ delta, now })
      requestAnimationFrame(this.tick);
    }
  }
}

const _instance = new RAF();
export default _instance;
