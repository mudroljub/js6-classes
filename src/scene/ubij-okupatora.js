import * as $ from '../konstante';
import {UI} from '../core/UI';
import {Scena} from '../core/Scena';
import {Pozadina} from '../core/Pozadina';
import {Nishan} from '../core/Nishan';
import {Okupator} from '../2d-prvo-lice/Okupator';

/*** KONFIG ***/

let ui;
let scena;
let pozadina;
let strazar;
let nishan;

const interfejs = `
  <h1>Ubij okupatora!</h1>
  <audio controls autoplay preload="auto">
    <source src="../../zvuci/otpisani.mp3" type="audio/mpeg">
    <source src="../../zvuci/otpisani.ogg" type="audio/ogg">
  </audio>
`;

/*** LOGIKA IGRE ***/

window.onload = init;

function init() {
  ui = new UI();
  ui.dodaj(interfejs);
  scena = new Scena(update);
  pozadina = new Pozadina(scena, $.root + "slike/pozadine/rusevine-varsava.jpg");
  strazar = new Okupator(scena);
  nishan = new Nishan(scena);
  scena.platno.addEventListener('click', () => strazar.proveriPogodak());
  scena.start();
}

function update() {
  pozadina.update();
  strazar.patroliraj();
  strazar.update();
}

/*** EXPORT ***/

export {scena}
