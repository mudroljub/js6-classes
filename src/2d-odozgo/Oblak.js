import * as $ from '../konstante'
import {Predmet} from '../core/Predmet'

export class Oblak extends Predmet {
  constructor(scena, brzina) {
    super(null, $.root + "slike/oblak.gif", 150, 100)
    this.scena = scena
    this.brzina = brzina
    this.reset()
  }

  reset() {
    this.dy = Math.random() * this.brzina + 5
    this.dx = Math.random() * 10 - 5
    var noviX = Math.random() * this.scena.sirina
    this.polozaj(noviX, 50)
  }

  proveriGranice() {
    if (this.y > this.scena.visina) this.reset()
  }
}
