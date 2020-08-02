(function () {
  'use strict'

  class Loader {
    constructor() {
      this.loadOrder = {
        images: [],
        json: [] 
      }
      this.resources = {
        images: [],
        jsons: []
      }
    }
    
    addImage(name, src) {
      this.loadOrder.images.push({name, src})
    }

    load(cb) {
      const promises = []

      for (const imageData of this.loadOrder.images) {
        const {name, src} = imageData
        const promise = Loader
          .loadImage(src)
          .then(image => {
            this.resources.images[name] = image

            if (this.loadOrder.images.includes(imageData)) {
              const index = this.loadOrder.images.indexOf(imageData)
              this.loadOrder.images.splice(index, 1)
            }
          })

        promises.push(promise)
      }

      Promise.all(promises).then(cb)
    }

    static loadImage(src) {
      return new Promise((resolve, reject) => {
        try {
          const image = new Image
          image.onload = () => resolve(image)
          image.src = src
        } catch (error) {
          reject(error)
        }
      })
    }
  }

  window.GameEngine = window.GameEngine || {}
  window.GameEngine.Loader = Loader
})() 