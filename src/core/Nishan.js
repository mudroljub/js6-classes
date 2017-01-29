import {root} from '../konstante'

export class Nishan {

  constructor() {
    this.pucanj = new Audio(root + 'zvuci/pucanj.wav')
    document.body.addEventListener('click', this.pucaj.bind(this))
    document.body.setAttribute('style', `cursor:url(${root}slike/2d-prvo-lice/nisan.png) 50 50, crosshair`)
  }

  pucaj() {
    if (this.pucanj.currentTime !== 0) this.pucanj.currentTime = 0
    this.pucanj.play()
  }
}
