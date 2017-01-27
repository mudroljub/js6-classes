import * as $ from '../konstante'
import * as _ from '../funkcije'
import {Predmet} from '../core/Predmet'
import platno from '../io/platno'
import {vracaVodoravno} from '../akcije/granice'

export class Oblak extends Predmet {

  constructor(sirina, visina, src = $.root + "slike/oblak.gif") {
    super(src, sirina, visina)
    this.polozaj(Math.random() * platno.width, _.randomRange(0, platno.height - this.visina))
    this.dy = Math.random() * 2 - 1
    this.procenatVracanja = 1
  }

  proveriGranice() {
    if (this.y < -platno.height) this.dy = -this.dy  // dozvoljena visina dve scene
    if (this.y > platno.height - this.visina) this.dy = -this.dy
    vracaVodoravno(this)
  }
}
