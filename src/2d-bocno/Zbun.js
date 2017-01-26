import * as $ from '../konstante'
import * as _ from '../funkcije'
import {Predmet} from '../core/Predmet'
import platno from '../io/platno'
import {vracaVodoravno} from '../akcije/proveriGranice'

export class Zbun extends Predmet {
  constructor(nivoTla = platno.height, src = $.root + "slike/2d-bocno/priroda/zbun.png") {
    super (null, src)
    this.randomDoTla(nivoTla)
    this.procenatVracanja = 1
  }

  randomDoTla(nivoTla) {
    this.polozaj(Math.random() * platno.width, _.randomRange(nivoTla - this.visina/2, platno.height))
  }

  proveriGranice() {
    vracaVodoravno(this)
  }
}
