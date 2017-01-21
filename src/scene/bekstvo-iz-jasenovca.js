'use strict';
// h1: Bekstvo iz Jasenovca

/*** IMPORT ***/

import * as $ from '../konstante';
import {Scena} from '../core/Scena';
import {Predmet} from '../core/Predmet';
import {Pozadina} from '../core/Pozadina';
import {TenkOdozgo} from '../2d-odozgo/TenkOdozgo';

/*** KONFIG ***/

var scena;
var pozadina;
var tenk;
var zica;

/*** INIT ***/

window.onload = init;

function init() {
  scena = new Scena(update);
  pozadina = new Pozadina(scena, $.root + "slike/teksture/beton.gif");
  tenk = new TenkOdozgo(scena, 100, 200);
  zica = new Predmet(scena, $.root + "slike/2d-bocno/stvari/bodljikava-zica.gif");
  zica.polozaj(400, 100);
  scena.start();
}

function update() {
  scena.cisti();
  pozadina.update();
  zica.update();
  tenk.patroliraj();
  tenk.update();
}

/*** EXPORT ***/

export {scena}
