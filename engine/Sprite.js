(function() {
  'use strict'

  class Sprite {
    constructor(texture, args = {}) {
      this.texture = texture

      const frame = args.frame || {}

      this.frame = {
        x: frame.x || 0,
        y: frame.y || 0,
        width: frame.width || texture.width,
        height: frame.height || texture.height,
      }

      this.x = args.x || 0
      this.y = args.y || 0
      this.anchorX = args.anchorX.x || 0
      this.anchorY = args.anchorY.y || 0
      this.width = args.width || this.frame.width
      this.height = args.height || this.frame.height

      if (args.scale !== undefined) {
        this.setScale(args.scale)
      }
    }

    setScale(val) {
      this.scaleX = val
      this.scaleY = val
    }

    get absoluteX() {
      return this.x - this.anchorX * this.width
    }

    set absoluteX(val) {
      this.x = val + this.anchorX * this.width
     return val
    }

    get absoluteY() {
      return this.y - this.anchorY * this.height
    }

    set absoluteY(val) {
      this.y = val + this.anchorY * this.height
      return val
    }

    get scaleX() {
      return this.width / this.frame.width
    }

    set scaleX(val) {
      this.width = this.frame.width * val
      return val
    }

    get scaleY() {
      return this.height / this.frame.height
    }

    set scaleY(val) {
      this.height = this.frame.height * val
      return val
    }

    draw(canvas, context) {
      context.drawImage(
        this.texture,
        this.frame.x,
        this.frame.y,
        this.frame.width,
        this.frame.height,

        this.absoluteX,
        this.absoluteY,
        this.width,
        this.height
      )
    }
  }

  window.GameEngine = window.GameEngine || {}
  window.GameEngine.Sprite = Sprite
})()