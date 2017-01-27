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
    return mish.x > predmet.levo && mish.x < predmet.desno && mish.y > predmet.gore && mish.y < predmet.dole
  },

  stisnutIznad(predmet) {
    return mish.stisnut && mish.iznad(predmet)
  }
}

export default mish
