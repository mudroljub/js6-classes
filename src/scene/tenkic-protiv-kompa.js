'use strict';
// ubaciti uništen tenk

/*** IMPORT ***/

import * as $ from '../konstante';
import {UI} from '../core/UI';
import {Scena} from '../core/Scena';
import {Pozadina} from '../core/Pozadina';
import {TenkPartizanski} from '../2d-bocno/TenkPartizanski';
import {TenkNemacki} from '../podcore/TenkNemacki';

/*** KONFIG ***/

let scena;
let tenk1;
let tenk2;
let pozadina;
let interfejs;

/*** LOGIKA IGRE ***/

window.onload = init;

function init() {
  interfejs = new UI();
  scena = new Scena(update, 800, 500);
  pozadina = new Pozadina(scena, $.root + "slike/pozadine/razrusen-grad-savremen.jpg");
  tenk1 = new TenkPartizanski(scena, 100, 450);
  tenk2 = new TenkNemacki(scena);
  window.setInterval(() => tenk2.puca(), 3000);
  scena.start();
} // init

function update() {
  scena.cisti();
  pozadina.update();
  tenk2.mrdaNasumicno();
  proveriPogodak(tenk1.granata, tenk2, 2)
  proveriPogodak(tenk2.granata, tenk1, -2)
  tenk1.update();
  tenk2.update();
  interfejs.render(praviUI());
} // update


/*** POMOĆNE FUNKCIJE ***/

function proveriPogodak(granata, tenk, pomak) {
  if (granata.sudara(tenk)) {
    tenk.energija -= Math.round(Math.random() * 100);
    granata.nestani();
    tenk.x += pomak;
    if (tenk.energija <= 0) {
      tenk.energija = 0;
      reset();
    }
  }
} // proveriPogodak

function reset() {
  // da piše jel izgubio il pobedio i nudi opet
  tenk1.polozaj(Math.random() * 300, 450);
  tenk2.polozaj(Math.random() * 300 + 500, 450);
  tenk1.energija = 100;
  tenk2.energija = 100;
} // reset

function praviUI() {
  return `
    <div class="komande bg-poluprovidno komande1">
      <span class="bold">Tenk 1</span>
      <br> A - levo
      <br> D - desno
      <br> W - gore
      <br> S - dole
      <br> space - puca
    </div>

    <div class="komande bg-poluprovidno komande2">
      <span class="bold">Tenk 2</span>
      <br> ← levo
      <br> → desno
      <br> ↑ gore
      <br> ↓ dole
      <br> M - puca
    </div>
    <div class="komande bg-poluprovidno energija1">${tenk1.energija}</div>
    <div class="komande bg-poluprovidno energija2">${tenk2.energija}</div>
    <progress class="komande poluprovidno progres1" value="${tenk1.energija}" max="100"></progress>
    <progress class="komande poluprovidno progres2" value="${tenk2.energija}" max="100"></progress>
  `;
} // praviUI

/*** EXPORT ***/

export {scena}
