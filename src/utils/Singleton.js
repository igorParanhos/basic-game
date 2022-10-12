class Singleton {
  static instance = null

  constructor(options) {
    if (!(this.constructor).instance)
      (this.constructor).instance = this
    else
      return (this.constructor).instance

    if (this.onInit)
      this.onInit(options)
  }
}

export default Singleton
