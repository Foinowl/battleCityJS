(function() {
  'user strict'

  class Game {
    constructor(args = {}) {
      this.renderer = new GameEngine.Renderer(args)
      this.loader = new GameEngine.Loader()
      this.scenesCollection = new GameEngine.Container()

      if (args.scenes) {
        this.add(...args.scenes)
      }

      if (args.el && args.el.appendChild) {
        args.el.appendChild(this.renderer.canvas)
      }

      const autoStartedScanes = this.scenes.filter(x => x.autoStart)

      autoStartedScanes.forEach(scene => {
          scene.status = 'loading'
          scene.loading(this.loader)
        })

      this.loader.load(() => {
        autoStartedScanes.forEach(scene => {
          scene.status = 'init'
          scene.init(this.loader)
        })

        autoStartedScanes.forEach(scene => {
          scene.status = 'started'
        })
      })

      requestAnimationFrame(timestamp => this.tick(timestamp))
    }

    get scenes() {
      return this.scenesCollection.displayObjects
    }

    add(...scenes) {
      this.scenesCollection.add(...scenes)
      for (const scene of scenes) {
        scene.parent = this
      }
    }

    tick(timestamp) {
      // this.update(timestamp)
      // this.renderer.clear()
      // this.renderer.render()

      this.scenes
        .filter(scene => scene.status === 'started')
        .forEach(scene => scene.update(timestamp))
      requestAnimationFrame(timestamp => this.tick(timestamp))
    }
  }

  window.GameEngine = window.GameEngine || {}
  window.GameEngine.Game = Game
})()