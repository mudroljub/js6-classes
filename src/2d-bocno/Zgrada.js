import {root} from '../konstante'
import Predmet from 'core/Predmet'
import {vracaVodoravno} from 'akcije/granice'

export class Zgrada extends Predmet {
  constructor(nivoTla, src = root + "slike/2d-bocno/zgrade/ruina.png") {
    super(src)
    this.tlo(nivoTla)
    this.procenatVracanja = 1
  }

  proveriGranice() {
    vracaVodoravno(this)
  }
}
