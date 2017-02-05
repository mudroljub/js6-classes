// dodati crnu pozadinu sa crvenim naslovom i zvezdom
// dodati neprijatelje

import {mapa as modelMapa} from '../mape/mapa-mala'
import Scena from 'core/Scena.js'
import {Mapa} from '../3d-prvo-lice/Mapa.js'
import {PrvoLice} from '../3d-prvo-lice/PrvoLice.js'
import {Panorama} from '../3d-prvo-lice/Panorama.js'
import slikaBeton from 'slike/teksture/beton.jpg'
import slikaNebo from 'slike/panorame/nebo.jpg'
import slikaCigle from 'slike/teksture/cigla2.png'
import slikaBunker from 'slike/2d-bocno/kuca-bunker.png'

/*** KONFIG ***/

const VELICINA_POLJA = 15

/*** INIT ***/

const mapa = new Mapa(VELICINA_POLJA, modelMapa)
const igrac = new PrvoLice(mapa, 2, 1)

export default class SavoScena extends Scena {
  static get naziv() {
    return 'Savo Mitraljezac'
  }

  constructor() {
    super()
    this.panorama = new Panorama(igrac, slikaNebo, slikaBeton, slikaCigle, slikaBunker)
    this.panorama.dometSvetla = 10
    this.dodaj(this.panorama, igrac)
  }

  end() {
    super.end()
    igrac.end()
    this.panorama.end()
  }
}
