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

const mapa = new Mapa(VELICINA_POLJA, modelMapa);
const savo = new PrvoLice(mapa, 2, 1);
const panorama = new Panorama(
  savo,
  $.root + 'slike/panorame/nebo.jpg',
  $.root + 'slike/teksture/beton.jpg',
  $.root + 'slike/teksture/cigla2.png',
  $.root + 'slike/2d-bocno/kuca-bunker.png'
);

export default class SavoDan extends Scena {
  constructor() {
    super()
    panorama.dometSvetla = 10;
  }

  update() {
    savo.update();
    panorama.update();
  }

  render() {
    panorama.crtaPozadinu(true);
    panorama.crtaZidove();
    savo.crtaPusku();
    savo.crtaRadar();
  }
}
