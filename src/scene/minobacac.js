// predmet crta posredi, kvadrat od gore levo!
// ubaciti sliku minobacača
// bodovi, mozda pogoci prema pokušajima, mozda dva igraca

import * as $ from '../konstante';
import {Scena} from '../core/Scena'
import {Predmet} from '../core/Predmet'
import {Kvadrat} from '../core/Kvadrat'
import {Minobacac} from '../core/Minobacac'

/*** KONFIG ***/

var scena;
var podloga;
var brdo;
var minobacac;
var tlo;

/*** LOGIKA IGRE ***/

window.onload = init;

function init() {
  scena = new Scena(update);
  podloga = scena.podloga;
  brdo = new Predmet(scena, $.root + "slike/brdo.jpg", 85, 280, 500, 50);
  minobacac = new Minobacac(scena, 10, 280, 200, 20);
  tlo = new Kvadrat(scena, 0, 300, 600, 30, "rgb(10,250,0)");
  scena.start();
}

function update() {
  podloga.clearRect(0, 0, scena.sirina, scena.visina);
  brdo.crta()
  tlo.crta()
  minobacac.update();
  proveriPogodak();
}

/*** POMOĆNE FUNKCIJE ***/

function proveriPogodak() {
  if (minobacac.djule.sudara(brdo) || minobacac.djule.sudara(tlo)) {
    // TODO: reset()
    scena.stop();
  }
}
