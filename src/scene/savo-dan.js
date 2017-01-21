// dodati crnu pozadinu sa crvenim naslovom i zvezdom
// dodati neprijatelje

import * as $ from '../konstante';
import {mapa as modelMapa} from '../mape/mapa-mala';
import {Scena} from '../core/Scena.js';
import {Mapa} from '../3d-prvo-lice/Mapa.js';
import {PrvoLice} from '../3d-prvo-lice/PrvoLice.js';
import {Panorama} from '../3d-prvo-lice/Panorama.js';

/*** KONFIG ***/

const VELICINA_POLJA = 15;

/*** INIT ***/

const scena = new Scena(update);
scena.velicina(window.innerWidth, window.innerHeight);
const mapa = new Mapa(scena, VELICINA_POLJA, modelMapa);
const savo = new PrvoLice(scena, mapa, 2, 1);
const panorama = new Panorama(
  scena, savo,
  $.root + 'slike/panorame/nebo.jpg',
  $.root + 'slike/teksture/beton.jpg',
  $.root + 'slike/teksture/cigla2.png',
  $.root + 'slike/2d-bocno/kuca-bunker.png'
);
panorama.dometSvetla = 10;

/*** FUNKCIJE ***/

function update() {
  savo.update();
  panorama.update();
  panorama.crtaPozadinu(true);
  panorama.crtaZidove();
  savo.crtaPusku();
  savo.crtaRadar();
}

export default scena
