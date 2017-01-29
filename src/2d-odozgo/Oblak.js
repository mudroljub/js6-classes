import {root} from '../konstante'
import {Predmet} from '../core/Predmet'
import platno from '../io/platno'

export class Oblak extends Predmet {
  constructor(brzina) {
    super(root + "slike/oblak.gif", 150, 100)
    this.brzina = brzina
    this.reset()
  }

  reset() {
    this.dy = Math.random() * this.brzina + 5
    this.dx = Math.random() * 10 - 5
    var noviX = Math.random() * platno.width
    this.polozaj(noviX, 50)
  }

  proveriGranice() {
    if (this.y > platno.height) this.reset()
  }
}
