import {unutar} from '../akcije/sudari'

const mish = {
  stisnut: false,

  init: () => {
    document.onmousemove = e => {
      mish.x = e.pageX
      mish.y = e.pageY
    }
    document.onmousedown = () => mish.stisnut = true
    document.onmouseup = () => mish.stisnut = false
  }(),

  iznad(predmet) {
    return unutar(mish, predmet)
  },

  stisnutIznad(predmet) {
    return mish.stisnut && mish.iznad(predmet)
  }
}

export default mish
