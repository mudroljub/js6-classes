export class Zvuk {
  constructor(src) {
    this.audio = createAudio(src)
    document.body.appendChild(this.audio)
  }

  play() {
    // if (this.audio.currentTime !== 0) this.audio.currentTime = 0
    this.audio.play()
  }

  showControls() {
    this.audio.setAttribute("controls", "controls")
    this.audio.style.display = "block"
  }
}

function createAudio(src){
  const audio = document.createElement("audio")
  audio.src = src
  audio.setAttribute("preload", "auto")
  audio.setAttribute("controls", "none")
  audio.style.display = "none"
  return audio
}
