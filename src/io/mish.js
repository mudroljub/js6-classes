const mish = {
  stisnut: false,

  init: () => {
    document.onmousemove = e => {
      mish.x = e.pageX
      mish.y = e.pageY
    }
    document.onmousedown = () => mish.stisnut = true
    document.onmouseup = () => mish.stisnut = false
  }()
}

export default mish
