const {Body, Sprite, Container, Game, Scene, Point} = GameEngine

const mainScene = new Scene({
  name: 'mainScene',
  autoStart: true,
  loading(loader) {
    loader.addImage('bunny', 'static/bunny.jpg')
  },
  init(loader) {
    const texture = this.parent.loader.getImage('bunny')

    this.bunny = new Body(texture, {
      scale: 0.25,
      anchorX: 0.5,
      anchorY: 0.5,
      x: this.parent.renderer.canvas.width / 2,
      y: this.parent.renderer.canvas.height / 2,
      debug: true
    })

    this.add(this.bunny)
  },

  // beforeDestroy() {
  //   delete this.bunny
  // },

  update(timestamp) {
    const {keyboard} = this.parent

    this.bunny.rotation = timestamp / 1000

    if (keyboard.arrowUp) {
      this.bunny.y -= 1
    }
  }
})

const game = new Game({
  el: document.body,
  width: 500,
  height: 500,
  background: 'green',
  scenes: [mainScene]
})