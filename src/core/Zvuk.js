const praviAudio = src => {
  const audio = document.createElement("audio")
  audio.src = src
  audio.preload = "auto"
  return audio
}

export class Zvuk {
  constructor(src) {
    this.audio = praviAudio(src)
  }

  play() {
    // if (this.audio.currentTime !== 0) this.audio.currentTime = 0
    this.audio.play()
  }

  stop() {
    this.audio.pause()
    this.audio.currentTime = 0;
  }
}
