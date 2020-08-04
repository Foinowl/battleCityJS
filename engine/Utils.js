(function() {

  const delayCollection = {}
  const uids = []

  const Utils = {}

  Utils.delay = function delay(name, timeoff = 0) {
    if (!delayCollection[name]) {
      delayCollection[name] = Date.now() 
      return true
    }

    if(delayCollection[name] + timeoff > Date.now()) {
      return false
    }

    delayCollection[name] = Date.now()
  }

  Utils.isInside = function isIndside(point, rect) {
    return rect.x < point.x && point.x < rect.x + rect.width
      && rect.y < point.y && point.y < rect.y + rect.height
  }

  Utils.generateUid = function generateUid(size = 10) {
    let uid = getRandomString()

    while (uids.includes(uid)) {
      uid = getRandomString()
    }

    return uid
  }

  window.GameEngine = window.GameEngine || {}
  window.GameEngine.Utils = Utils

  const alphabet = 'qwertyuiopasdfghjklzxcvbnm1234567890'

  function getRandomLetter() {
    return alphabet[Math.floor(Math.random() * alphabet.length)]
  }

  function getRandomString(size = 10) {
    let str = ''

    while(str.length < size) {
      str += getRandomLetter()
    }

    return str
  }
})()