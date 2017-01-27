import * as $ from '../konstante'
import {VoziloIgracOdozgo} from '../2d-odozgo/VoziloIgracOdozgo'

const JACINA_STRUJE = 0.1

export class CamacIgracOdozgo extends VoziloIgracOdozgo {

  constructor(src = $.root + "slike/2d-odozgo/camac.png", sirina = 100, visina = 50) {
    super(src, sirina, visina)
    this.potisak = 0.8
  }

  update() {
    super.update()
    this.dodajStruju()
  }

  dodajStruju() {
    if (this.x > this.sirina) this.dodajSilu(JACINA_STRUJE, Math.PI)
  }

}
