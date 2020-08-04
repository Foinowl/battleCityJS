(function() {
  'user strict'

  class Game {
    constructor(args = {}) {
      this.renderer = new GameEngine.Renderer(args)
      this.loader = new GameEngine.Loader()
      this.scenesCollection = new GameEngine.Container()
      this.keyboard = new GameEngine.Keyboard()

      if (args.scenes) {
        this.addScene(...args.scenes)
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

    addScene(...scenes) {
      this.scenesCollection.add(...scenes)
      for (const scene of scenes) {
        scene.parent = this
      }
    }

    tick(timestamp) {
      const startedScenes = this.scenes.filter(x => x.status === 'started')


      for (const scene of startedScenes) {
        scene.update(timestamp)
      }

      for (const scene of startedScenes) {
        scene.tick(timestamp)
      }

        this.renderer.clear()

        for (const scene of startedScenes) {
          scene.draw(this.renderer.canvas, this.renderer.context)
        }

      requestAnimationFrame(timestamp => this.tick(timestamp))
    }

    getScene(name) {
      if (name instanceof GameEngine.Scene) {
        if (this.scenes.includes(name)) {
          return name
        }
      } 
      if (typeof name === 'string') {
        for (const sceneItem of this.scenes) {
          if (sceneItem.name === name) {
            return scene
          }
        }
      } 
      if (scene === null) {
        return false
      }
    }

    startScene(name) {
      const scene = this.getScene(name)

      if (!scene) {
        return false
      }

      scene.status = 'loading'
      scene.loading(this.loader)

    this.loader.load(() => {
      scene.status = 'init'
      scene.init(this.loader)

      scene.status = 'started'
    })

    return true
    }

    finishScene(name) {
      const scene = this.getScene(name)

      if (!scene) {
        return false
      }

      scene.status = 'finished'
      this.scenesCollection.remove(scene)
      scene.beforeDesctroy()
    }
  }

  window.GameEngine = window.GameEngine || {}
  window.GameEngine.Game = Game
})()