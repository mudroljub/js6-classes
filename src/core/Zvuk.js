export class Zvuk {
  constructor(src) {
    this.audio = new Audio(src)
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
