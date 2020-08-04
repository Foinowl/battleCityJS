(function() {
  'user strict'

  class Keyboard {
    constructor() {
      this.ArrowUp = false
      this.ArrowDown = false
      this.ArrowLeft = false
      this.ArrowRight = false
      this.Space = false

      document.body.addEventListener('keydown', (event) => {
        switch(event.code) {
          case 'ArrowUp':
            this.ArrowUp = true
            break
          case 'ArrowDown':
            this.ArrowDown = true
            break
          case 'ArrowLeft':
            this.ArrowLeft = true
            break
          case 'ArrowRight':
            this.ArrowRight = true
            break
          case 'Space':
            this.Space = true
            break
        }
      })

      document.body.addEventListener('keyup', (event) => {
        switch(event.code) {
          case 'ArrowUp':
            this.ArrowUp = false
            break
          case 'ArrowDown':
            this.ArrowDown = false
            break
          case 'ArrowLeft':
            this.ArrowLeft = false
            break
          case 'ArrowRight':
            this.ArrowRight = false
            break
          case 'Space':
            this.Space = false
            break
        }
      })
    }
  }

  window.GameEngine = window.GameEngine || {}
  window.GameEngine.Keyboard = Keyboard
})()