import * as $ from '../konstante'
import {mapa as modelMapa} from '../mape/mapa-mala'
import {Scena} from '../core/Scena.js'
import {Mapa} from '../3d-prvo-lice/Mapa.js'
import {PrvoLice} from '../3d-prvo-lice/PrvoLice.js'
import {Panorama} from '../3d-prvo-lice/Panorama.js'

/*** KONFIG ***/

const VELICINA_MAPE = 32
const VELICINA_POLJA = 8

/*** INIT ***/

const mapa = new Mapa(VELICINA_POLJA, modelMapa)
const savo = new PrvoLice(mapa, 15.3, -1.2)
const panorama = new Panorama(savo,
  $.root + 'slike/panorame/noc.jpg',
  $.root + 'slike/teksture/beton.jpg'
)

export default class SavoNoc extends Scena {
  constructor() {
    super()
    mapa.praviNasumicno(VELICINA_MAPE)
    panorama.dometSvetla = 10
  }

  update() {
    savo.update()
    panorama.update()
  }

  render() {
    panorama.crtaPozadinu(false)
    panorama.crtaZidove()
    savo.crtaPusku()
    savo.crtaRadar()
  }
}
