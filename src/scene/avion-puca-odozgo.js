// ubaciti jednog neprijatelja i jednu stvar za hvatanje (paketić)
// senku ispod aviona, kao u avion.png

import {UI} from '../core/UI';
import {Scena} from '../core/Scena';
import {Avionce} from '../2d-odozgo/Avionce';
import {Okean} from '../2d-odozgo/Okean';
import {Ostrvo} from '../2d-odozgo/Ostrvo';
import {Oblak} from '../2d-odozgo/Oblak';

/*** KONFIG ***/

let poeni = 0;
let zivoti = 3;
const oblaci = [];
const BROJ_OBLAKA = 3;
const BRZINA_POZADINE = 10;

const naslov = "Osvetnik pete ofanzive";
const interfejs = new UI();
const scena = new Scena(update);
const avion = new Avionce(scena);
const pozadina = new Okean(scena, BRZINA_POZADINE, window.innerWidth);
const ostrvo = new Ostrvo(scena, BRZINA_POZADINE);

/*** FUNKCIJE ***/

function update() {
  pozadina.update();
  ostrvo.update();
  avion.update();
  azurirajOblake();
  proveriSudare();
  interfejs.render(praviUI());
}

function praviUI() {
  return `
    <h1>${naslov}</h1>
    Poeni: ${poeni}<br>
    Životi: ${zivoti}<br>
    Meci: ${avion.preostaloMetaka()}
  `;
}

function praviOblake() {
  for (var i = 0; i < BROJ_OBLAKA; i++) oblaci[i] = new Oblak(scena, BRZINA_POZADINE);
}

function azurirajOblake() {
  for (var i = 0; i < BROJ_OBLAKA; i++) oblaci[i].update();
}

function proveriSudare() {
  if (avion.sudara(ostrvo)) {
    ostrvo.reset();
    zivoti--;
  }
  oblaci.map(oblak => {
    if (avion.sudara(oblak)) {
      oblak.reset();
      poeni++;
    }
  })
}

/*** INIT ***/

praviOblake();

/*** EXPORT ***/

export default scena
