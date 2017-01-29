import {root} from '../konstante'
import {Predmet} from '../core/Predmet'
import platno from '../io/platno'
import {vracaVodoravno} from '../akcije/granice'

export class Shuma extends Predmet {

  constructor(nivoTla = platno.height, src = root + "slike/2d-bocno/priroda/shumarak.png") {
    super(src)
    this.procenatVracanja = 1
    this.x = Math.random() * platno.width
    this.tlo(nivoTla + 5)
  }

  proveriGranice() {
    vracaVodoravno(this)
  }
}
