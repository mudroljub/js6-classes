// dodati crnu pozadinu sa crvenim naslovom i zvezdom
// dodati neprijatelje

import {root} from '../konstante';
import {mapa as modelMapa} from '../mape/mapa-mala';
import Scena from 'core/Scena.js';
import {Mapa} from '../3d-prvo-lice/Mapa.js';
import {PrvoLice} from '../3d-prvo-lice/PrvoLice.js';
import {Panorama} from '../3d-prvo-lice/Panorama.js';

/*** KONFIG ***/

const VELICINA_POLJA = 15;

/*** INIT ***/

const mapa = new Mapa(VELICINA_POLJA, modelMapa);
const igrac = new PrvoLice(mapa, 2, 1);

export default class SavoScena extends Scena {
  static get naziv() {
    return "Savo Mitraljezac"
  }

  constructor() {
    super()
    this.panorama = new Panorama(
      igrac,
      root + 'slike/panorame/nebo.jpg',
      root + 'slike/teksture/beton.jpg',
      root + 'slike/teksture/cigla2.png',
      root + 'slike/2d-bocno/kuca-bunker.png'
    )
    this.panorama.dometSvetla = 10
    this.dodaj(this.panorama, igrac)
  }

  end() {
    super.end()
    igrac.end()
    this.panorama.end()
  }
}
