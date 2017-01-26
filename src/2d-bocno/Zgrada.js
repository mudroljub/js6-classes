import * as $ from '../konstante'
import {Predmet} from '../core/Predmet'
import {vracaVodoravno} from '../akcije/proveriGranice'

export class Zgrada extends Predmet {
  constructor(nivoTla, src = $.root + "slike/2d-bocno/zgrade/ruina.png") {
    super(null, src)
    this.tlo(nivoTla)
    this.procenatVracanja = 1
  }

  proveriGranice() {
    vracaVodoravno(this)
  }
}
