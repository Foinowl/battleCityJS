const {Body, Sprite, Container, Game, Scene, EventEmitter, Utils, ArcadePhysics} = GameEngine

const mainScene = new Scene({
  name: 'mainScene',
  autoStart: true,
  loading(loader) {
    loader.addImage('bunny', 'static/bunny.jpg')
  },
  init(loader) {
    const texture = this.parent.loader.getImage('bunny')


    this.arcadePhysics = new ArcadePhysics 

    this.bunny1 = new Body(texture, {
      scale: 0.25,
      anchorX: 0.5,
      anchorY: 0.5,
      x: this.parent.renderer.canvas.width / 2,
      y: this.parent.renderer.canvas.height / 2,
      debug: true
    })

    this.bunny2 = new Body(texture, {
      scale: 0.25,
      anchorX: 0.5,
      anchorY: 0.5,
      x: this.parent.renderer.canvas.width / 4,
      y: this.parent.renderer.canvas.height / 4,
      debug: true
    })

    this.add(this.bunny1, this.bunny2)
    this.arcadePhysics.add(this.bunny1, this.bunny2)
  },

  update(timestamp) {
    const {keyboard} = this.parent

    this.bunny1.velocity.x = 0
    this.bunny1.velocity.y = 0

    if (keyboard.ArrowUp) {
      this.bunny1.velocity.y = -5
    }
    if (keyboard.ArrowDown) {
      this.bunny1.velocity.y = +5
    }

    this.arcadePhysics.processing()
  }
})

const game = new Game({
  el: document.body,
  width: 500,
  height: 500,
  background: 'green',
  scenes: [mainScene]
})