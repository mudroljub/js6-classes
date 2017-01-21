import {mapa as modelMapa} from '../mape/mapa-mala';
import {Scena} from '../core/Scena.js';

import {Mapa} from '../3d-prvo-lice/Mapa.js';
import {PrvoLice} from '../3d-prvo-lice/PrvoLice.js';
import {Panorama} from '../3d-prvo-lice/Panorama.js';

/*** KONFIG ***/

const VELICINA_MAPE = 32;
const VELICINA_POLJA = 8;
let scena;
let mapa;
let savo;
let panorama;

/*** LOGIKA IGRE ***/

window.onload = init;

function init() {
  scena = new Scena(update);
  scena.velicina(window.innerWidth, window.innerHeight);
  mapa = new Mapa(scena, VELICINA_POLJA, modelMapa);
  mapa.praviNasumicno(VELICINA_MAPE);
  savo = new PrvoLice(scena, mapa, 15.3, -1.2);
  panorama = new Panorama(scena, savo, window.basepath + 'slike/panorame/noc.jpg',
    window.basepath + 'slike/teksture/beton.jpg'
  );
  panorama.dometSvetla = 10;
  scena.start();
}

function update() {
  savo.update();
  panorama.update();
  panorama.crtaPozadinu(false);
  panorama.crtaZidove();
  savo.crtaPusku();
  savo.crtaRadar();
}
