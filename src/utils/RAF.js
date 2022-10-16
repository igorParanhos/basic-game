import Observer from './Observer'

export class RAF extends Observer {
  constructor() {
    super()
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.tick = this.tick.bind(this);
  }

  emit = this._emit('tick')
  subscribe = this._on('tick')
  unsubscribe = this._cancel('tick')

  start = () => {
    this.isPaused = false;
    this.tick(this.time)
  }
  pause = () => {
    this.isPaused = true;
  }
  tick = (now) => {
    let delta = 0;
    if (this.time)
      delta = now - this.time
    this.time = now

    if (!this.isPaused) {
      this.emit({ delta, now })
      requestAnimationFrame(this.tick);
    }
  }
}

const _instance = new RAF();
export default _instance;
