import {root} from '../konstante'
import {Igrac} from '../core/Igrac'

const OKRET = 0.035

export class Ranjenik extends Igrac {

  constructor() {
    super (root + "slike/2d-odozgo/ranjeni-partizan.png", 70, 30)
    this.korak = 1
    this.pogodjen = 0
  }

  nalevo() {
    this.ugao -= OKRET
  }

  nadesno() {
    this.ugao += OKRET
  }

  nagore() {
    this.pomeri(this.korak)
  }

  nadole() {
    this.pomeri(-this.korak/5)
  }
}
