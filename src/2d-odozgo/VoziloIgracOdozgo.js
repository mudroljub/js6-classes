import * as $ from '../konstante'
import {Igrac} from '../core/Igrac'
import {Granata} from './Granata'
import {odbij} from '../akcije/proveriGranice'

export class VoziloIgracOdozgo extends Igrac {

  constructor(src, sirina, visina) {
    super(src, sirina, visina)
    this.potisak = 2
    this.prohodnost = 0.85
    this.granata = new Granata(this)
    this.podesiTipke($.LEVO, $.DESNO, $.GORE, $.DOLE)
    this.komandeNapredne = true
    this.granicnik = odbij
  }

  update() {
    super.update()
    this.granata.update()
  }

  puca() {
    this.granata.puca()
  }
}
