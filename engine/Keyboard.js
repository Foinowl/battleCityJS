(function() {
  'user strict'

  class Keyboard {
    constructor() {
      this.arrowUp = false
      this.arrowDown = false
      this.arrowLeft = false
      this.arrowRight = false
      this.space = false

      document.body.addEventListener('keydown', (event) => {
        switch(event.code) {
          case 'ArrowUp':
            this.arrowUp = true
            break
          case 'arrowDown':
            this.arrowDown = true
            break
          case 'arrowLeft':
            this.arrowLeft = true
            break
          case 'arrowRight':
            this.arrowRight = true
            break
          case 'Space':
            this.space = true
            break
        }
      })

      document.body.addEventListener('keyup', (event) => {
        switch(event.code) {
          case 'ArrowUp':
            this.arrowUp = false
            break
          case 'arrowDown':
            this.arrowDown = false
            break
          case 'arrowLeft':
            this.arrowLeft = false
            break
          case 'arrowRight':
            this.arrowRight = false
            break
          case 'Space':
            this.space = false
            break
        }
      })
    }
  }

  window.GameEngine = window.GameEngine || {}
  window.GameEngine.Keyboard = Keyboard
})()