(function() {
  'use strict'

  class Sprite extends GameEngine.DisplayObject{
    constructor(texture, args = {}) {
      super(args)
      const frame = args.frame || {}
      const velocity = args.velocity || {}
      
      this.texture = texture

      this.frames = []
      this.frameNumber = 0
      this.frameDelay = 0

      this.animations = []
      this.animation = ''

      this.velocity = {
        x: velocity.x || 0,
        y: velocity.y || 0
      }

      this.frame = {
        x: frame.x || 0,
        y: frame.y || 0,
        width: frame.width || texture.width,
        height: frame.height || texture.height,
      }

      if (args.width === undefined && args.height === undefined) {
        this.width = this.frame.width
        this.height = this.frame.height
      }

    }

    setFrameCollection(framesCollection) {
      this.frames = framesCollection
    }

    setAnimationsCollection(animationsCollection) {
      this.animations = animationsCollection
    }

    startAnimation(name) {
       if (!this.animations.hasOwnProperty(name)) {
         return false
       }

       this.animation = name
       const {duration, frames} = this.animations[this.animation]
       this.frameDelay = duration / frames.length
       this.setFrameByKeys(
         this.animations[this.animation].frames[0]
       )
    }

    setFrameByKeys(...keys) {
      const frame = this.getFrameByKeys(...keys)

      if(!frame) {
        return
      }

      this.frame.x = frame.x
      this.frame.y = frame.y
      this.frame.width = frame.width
      this.frame.height = frame.height

      this.width = this.frame.width
      this.height = this.frame.height
    }

    getFrameByKeys(...keys) {
      let flag = false

      for (const frame of this.frames) {
        flag = true

        for (const key of keys) {
          if (!frame.keys.includes(key)) {
            flag = true
            break
          }
        }

        if (flag) {
          return frame
        }
      }
    }

    tick(timestamp) {
      if (this.animation && GameEngine.Utils.delay(this.animation + this.uid, this.frameDelay)) {
        const {frames} = this.animations[this.animation]
        this.frameNumber = (this.frameNumber + 1) % frames.length
        this.setFrameByKeys(...frames[this.frameNumber])
      }

      this.x += this.velocity.x
      this.y += this.velocity.y
    }

    draw(canvas, context) {
      super.draw(() => {
        context.save()
        context.translate(this.x, this.y)
        context.rotate(this.rotation)
        // context.scale(this.scaleX, this.scaleY)
  
        context.drawImage(
          this.texture,
          this.frame.x,
          this.frame.y,
          this.frame.width,
          this.frame.height,
  
          this.absoluteX,
          this.absoluteY,
          this.width * this.scaleX,
          this.height * this.scaleY      
        )
  
        context.restore()
      })
    }
  }

  window.GameEngine = window.GameEngine || {}
  window.GameEngine.Sprite = Sprite
})()