// scena kao velika mapa lavirint
// kretanje u svim pravcima, kamera prati igraca
// razlicite podloge ubrzavaju/usporavaju tenk

import * as $ from '../konstante';
import {Scena} from '../core/Scena';
import {Pozadina} from '../core/Pozadina';
import {TenkIgracOdozgo} from '../2d-odozgo/TenkIgracOdozgo';

/*** KONFIG ***/

let scena;
let pozadina;
let tenk;

/*** INIT ***/

window.onload = init;

function init() {
  scena = new Scena(update);
  pozadina = new Pozadina(scena, $.root + "slike/2d-odozgo/shumarak-pozadina.png");
  tenk = new TenkIgracOdozgo(scena);
  scena.start();
}

function update() {
  pozadina.update();
  tenk.update();
}

/*** EXPORT ***/

export {scena}
