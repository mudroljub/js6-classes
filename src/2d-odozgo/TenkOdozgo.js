import * as $ from '../konstante'
import {Predmet} from '../core/Predmet'
import {Zvuk} from '../core/Zvuk'

// const SILA = 0.1
const LEVO = 0
const DESNO = 1

export class TenkOdozgo extends Predmet {
  constructor(x = 100, y = 200) {
    super(null, $.root + "slike/2d-odozgo/tenk-rdjavi.gif", 168, 70)
    this.x = x
    this.y = y
    this.tenkMp3 = new Zvuk($.root + "zvuci/zvuk-tenka.mp3")
    this.stanje = DESNO
  }

  patroliraj() {
    if (this.stanje == DESNO) this.idiDesno()
    if (this.stanje == LEVO) this.idiLevo()
    if (this.x > 600) this.stanje = LEVO
    if (this.x < 150) this.stanje = DESNO
  }

  idiLevo() {
    this.x--
    // this.dodajSilu(0, -SILA)
    this.ugao = $.KRUZNICA / 2
  }

  idiDesno() {
    this.x++
    // this.dodajSilu(0, SILA)
    this.ugao = 0
  }
}
