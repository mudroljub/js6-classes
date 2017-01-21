// staviti naznaku da ranjenik moze da izadje sa scene
// iskoristiti za Bekstvo iz Jasenovca i Stradanje ranjenika na Sutjesci
// u jasenovcu beton i trebalo bi ustase, a na sutjesci nemci, italijani, cetnici

/*** IMPORT ***/

import * as $ from '../konstante';
import {Scena} from '../core/Scena';
import {Pozadina} from '../core/Pozadina';
import {Ranjenik} from '../2d-odozgo/Ranjenik';
import {Patrola} from '../2d-odozgo/Patrola';

/*** KONFIG ***/

var scena;
var pozadina;
var ranjenik;
var patrola;
let postavka = 0;

/*** LOGIKA IGRE ***/

window.onload = init;

function init() {
  scena = new Scena(update);
  pozadina = new Pozadina(scena, $.root + "slike/2d-odozgo/shumarak-pozadina.png");
  ranjenik = new Ranjenik(scena);
  ranjenik.polozaj(scena.sirina / 4, scena.visina / 2);
  patrola = new Patrola(scena, $.root + "slike/2d-odozgo/nemci-patrola.gif");
  patrola.polozaj(scena.sirina * 3/4, scena.visina * 3/4);
  scena.start();
}

function update() {
  scena.cisti();
  patrola.zuji();
  proveriSudare();
  proveriPobedu();
  pozadina.update();
  ranjenik.update();
  patrola.update();
}

/*** POMOCNE FUNKCIJE ***/

function proveriSudare() {
  if (patrola.sudara(ranjenik)) {
    patrola.stop();
    patrola.vikni(3);
    scena.stop();
  }
}

function proveriPobedu() {
  if (jeRanjenikIzasao()) promeniPostavku();
  if (postavka > 3) {
    console.log("pobeda!");
    scena.stop();
  }
}

function jeRanjenikIzasao() {
  return ranjenik.x > scena.sirina - ranjenik.sirina
}

function promeniPostavku() {
  let isEven = postavka % 2 === 0;
  let slikaPozadine = isEven ? "slike/teksture/beton.gif" : "slike/2d-odozgo/shumarak-pozadina.png";
  let slikaPatrole = isEven ? "slike/2d-odozgo/talijani-patrola.gif" : "slike/2d-odozgo/nemci-patrola.gif";
  pozadina.zameniSliku($.root + slikaPozadine);
  patrola.zameniSliku($.root + slikaPatrole);
  patrola.postaviNasumicno();
  ranjenik.x = 10;
  postavka++;
}

/*** EXPORT ***/

export {scena}
