// scena kao velika mapa lavirint
// kretanje u svim pravcima, kamera prati igraca
// razlicite podloge ubrzavaju/usporavaju tenk

import {root} from '../konstante'
import {Scena} from '../core/Scena'
import {Pozadina} from '../core/Pozadina'
import {TenkIgracOdozgo} from '../2d-odozgo/TenkIgracOdozgo'

/*** INIT ***/

const pozadina = new Pozadina(root + "slike/2d-odozgo/shumarak-pozadina.png")
const tenk = new TenkIgracOdozgo()

/*** EXPORT ***/

export default class TenkOdozgoScena extends Scena {
  update() {
    pozadina.update()
    tenk.update()
  }
}
