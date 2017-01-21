// dodaj interfejs
// mitraljez puca iz bunkera, prepreke su zakloni
// sukcesivno se povećava broj prepreka i težina igre
  // svaki nivo novi random raspored, igrač igra dok ne izgubi
// minimalno rastojanje bombaša i bunkera?
// vremenski ograniceno?

import * as $ from '../konstante';
import {Scena} from '../core/Scena';
import {Casovnik} from '../core/Casovnik';
import {Pozadina} from '../core/Pozadina';
import {Bombas} from '../2d-bocno/Bombas';
import {Bunker} from '../2d-bocno/Bunker';
import {Prepreka} from '../2d-bocno/Prepreka';

/*** KONFIG ***/

const ZADATOVREME = 50;
const BROJ_PREPREKA = 10;
const prepreke = [];
let nivo = 1;
let vreme;

/*** LOGIKA IGRE ***/

const brojac = new Casovnik();
const info = document.getElementById("info");
const izbor = document.getElementById("izbor");
const scena = new Scena(update);
const pozadina = new Pozadina(scena, $.root + "slike/teksture/beton.gif");
const bombas = new Bombas(scena, $.root + "slike/2d-bocno/partizani/vojnici/bombasi/partizan-bombas.gif", 50, 55);
const bunker = new Bunker(scena, 112, 103);
bunker.nemojPreko(bombas);
const tabela = document.getElementById("tabela");

praviPrepreke();

/*** POMOĆNE FUNKCIJE ***/

function update() {
  scena.cisti();
  pozadina.update();
  proveriVreme();
  proveriPobedu();
  proveriPrepreke();
  bunker.update();
  bombas.update();
  // prikaziStatistike();
}

function praviPrepreke() {
  for (let i = 0; i < BROJ_PREPREKA; i++) {
    prepreke[i] = new Prepreka(scena, [bunker, bombas]);
  }
}

function proveriPobedu() {
  if (bombas.razmakDo(bunker) < 75) {
    bunker.gori();
    zavrsiIgru('Neprijateljski bunker je uništen.');
  }
}

function proveriVreme() {
  vreme = brojac.dajProtekleSekunde();
  if (vreme > ZADATOVREME) {
    zavrsiIgru('Tvoje vreme je isteklo. Igra je završena!');
  }
}

function proveriPrepreke() {
  for (let i = 0; i < BROJ_PREPREKA; i++) {
    if (bombas.sudara(prepreke[i])) {
      zavrsiIgru('Poginuo si. Igra je završena.');
    }
    prepreke[i].update();
  }
}

function praviUI() {
  return `
    <h1>Bitka za Krupanj 1941.</h1>
    <h3>Dovedi Žikicu Jovanovića Španca do nemačkog bunkera! </h3>
    <div class="tabela">
      Nivo: ${nivo} <br>
      Vreme: ${Math.floor(vreme)} <br>
      Prepreke: ${BROJ_PREPREKA}
    </div>
  `;
}

function zavrsiIgru(poruka) {
  let dugme = `<a class="izbor">Igraj opet</a><a href="#" class="izbor">Vrati me u priču</a>`;
  console.log(poruka, dugme);
  scena.stop();
}

function reset() {
  // nekako resetovati
}

/*** EXPORT ***/

export default scena
