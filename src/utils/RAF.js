class RAF {
  constructor() {
    this.bind();
    this.callbacks = [];
    this.render();
  }

  subscribe = (name, callback) => {
    this.callbacks.push({
      name: name,
      callback: callback,
    });
  }

  unsubscribe = (name) => {
    this.callbacks.forEach((item, i) => {
      if (item.name == name) this.callbacks.splice(i, i + 1);
    });
  }

  render = () => {
    requestAnimationFrame(this.render);
    this.callbacks.forEach((item) => {
      item.callback()
    });
  }
}

const _instance = new RAF();
export default _instance;
