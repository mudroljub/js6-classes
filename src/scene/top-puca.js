import {Scena} from '../core/Scena';
import {Top} from '../core/Top';
import {UI} from '../core/UI';

/*** KONFIG ***/

let scena;
let haubica;
let interfejs;

/*** LOGIKA IGRE ***/

window.onload = init;

function init() {
  interfejs = new UI();
  scena = new Scena(update, 1000, 350);
  haubica = new Top(scena);
  scena.start();
}

function update() {
  scena.crtaNeboZemlju(250, "lightblue", "green");
  haubica.update();
  // interfejs.render(praviUI());
}

/*** POMOĆNE FUNKCIJE ***/

function praviUI() {
  return `
  <div>
    ugao: ${haubica.ugao}<br>
    brzina: ${haubica.brzina}
  </div>
  `;
}
