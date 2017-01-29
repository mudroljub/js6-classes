const praviAudio = src => {
  const audio = document.createElement("audio")
  audio.src = src
  audio.preload = "auto"
  document.body.appendChild(audio)
  return audio
}

export class Zvuk {
  constructor(src) {
    this.audio = praviAudio(src)
    this.pokaziKontrole()
  }

  play() {
    // if (this.audio.currentTime !== 0) this.audio.currentTime = 0
    this.audio.play()
  }

  stop() {
    this.audio.pause()
    this.audio.currentTime = 0;
  }

  ukloni() {
    this.audio.src = ''
    this.audio.load()
    document.body.removeChild(this.audio)
    delete this.audio
  }

  pokaziKontrole() {
    this.audio.controls = true
    this.audio.style.display = "block"
  }

  sakrijKontrole() {
    this.audio.controls = "none"
    this.audio.style.display = "none"
  }
}
