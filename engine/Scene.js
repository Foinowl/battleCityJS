(function() {
  'user strict'

  class Scene extends GameEngine.Container{
    constructor(args = {}) {
      super()

      this.autoStart = args.autoStart || false
      this.name = name || ''
      this.status = 'waiting'
      this.stage = this.displayObjects
      this.game = null

      if (args.loading) {
        this.loading = args.loading.bind(this)
      }

      if (args.init) {
        this.init = args.init.bind(this)
      }

      if (args.update) {
        this.update = args.update.bind(this)
      }

      if (args.beforeDestroy) {
        this.beforeDestroy = args.beforeDestroy.bind(this)
      }
    }

    loading() {

    }

    init() {

    }

    update() {}

    beforeDestroy() {
      Object.keys(this).forEach(key => delete this[key])
    }
  }

  window.GameEngine = window.GameEngine || {}
  window.GameEngine.Scene = Scene
})()