import * as $ from '../konstante';
import {mapa as modelMapa} from '../mape/mapa-mala';
import {Scena} from '../core/Scena.js';
import {Mapa} from '../3d-prvo-lice/Mapa.js';
import {PrvoLice} from '../3d-prvo-lice/PrvoLice.js';
import {Panorama} from '../3d-prvo-lice/Panorama.js';

/*** KONFIG ***/

const VELICINA_MAPE = 32;
const VELICINA_POLJA = 8;

/*** INIT ***/

const scena = new Scena(update);
scena.velicina(window.innerWidth, window.innerHeight);
const mapa = new Mapa(scena, VELICINA_POLJA, modelMapa);
mapa.praviNasumicno(VELICINA_MAPE);
const savo = new PrvoLice(scena, mapa, 15.3, -1.2);
const panorama = new Panorama(scena, savo,
  $.root + 'slike/panorame/noc.jpg',
  $.root + 'slike/teksture/beton.jpg'
);
panorama.dometSvetla = 10;

function update() {
  savo.update();
  panorama.update();
  panorama.crtaPozadinu(false);
  panorama.crtaZidove();
  savo.crtaPusku();
  savo.crtaRadar();
}

export default scena
