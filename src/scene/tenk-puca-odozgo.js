// scena kao velika mapa lavirint
// kretanje u svim pravcima, kamera prati igraca
// razlicite podloge ubrzavaju/usporavaju tenk

import * as $ from '../konstante';
import {Scena} from '../core/Scena';
import {Pozadina} from '../core/Pozadina';
import {TenkIgracOdozgo} from '../2d-odozgo/TenkIgracOdozgo';

/*** INIT ***/

const scena = new Scena(update);
const pozadina = new Pozadina(scena, $.root + "slike/2d-odozgo/shumarak-pozadina.png");
const tenk = new TenkIgracOdozgo(scena);

function update() {
  pozadina.update();
  tenk.update();
}

/*** EXPORT ***/

export default scena
