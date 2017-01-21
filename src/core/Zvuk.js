'use strict';
// ako ima dva formata proveriti koji prepoznaje da ne pušta oba

export class Zvuk {

  constructor(src) {
    this.audio = this.createAudio(src);
    document.body.appendChild(this.audio);
  }

  createAudio(src){
    let audio = document.createElement("audio"); // may need both ogg and mp3
    audio.src = src;
    audio.setAttribute("preload", "auto"); // preload if possible (won't work on IOS)
    audio.setAttribute("controls", "none");
    audio.style.display = "none";
    return audio;
  }

  play() {
    // if (this.audio.currentTime !== 0) this.audio.currentTime = 0;
    this.audio.play();
  }

  showControls() {
    showControls(this.audio);
  }

} // Zvuk


/* PRIVATE */

function showControls(sound) {
  sound.setAttribute("controls", "controls");
  sound.style.display = "block";
} // showControls
