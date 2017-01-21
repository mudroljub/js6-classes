// beskonačan ekran nadesno
// mozda ubaciti obale da promiču
// nailazi na prepreke, stenje, brodolomnike, čamce, krstarice, brodove....

import {Scena} from '../core/Scena';
import {CamacIgracOdozgo} from '../2d-odozgo/CamacIgracOdozgo';

/*** KONFIG ***/

var scena;
var camac;

/*** INIT ***/

window.onload = init;

function init() {
  scena = new Scena(update);
  scena.bojaPozadine = "#000066";
  camac = new CamacIgracOdozgo(scena);
  scena.start();
}

function update() {
  scena.cisti();
  camac.update();
}

/*** EXPORT ***/

export {scena}
