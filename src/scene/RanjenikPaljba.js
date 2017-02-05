import {root} from '../konstante'
import Scena from 'core/Scena'
import Vreme from 'core/Vreme'
import UI from 'core/UI'
import Ranjenik from '../2d-odozgo/Ranjenik'
import Pozadina from 'core/Pozadina'
import {Paljba} from '../2d-odozgo/Paljba'

/*** KONFIG ***/

const BROJ_PLOTUNA = 15
const RITAM_PALJBE = 1500
const ZADATO_VREME = 60
let plotuni = []
let ovajPlotun = 0
let vremeIgre = 0
let protekleMilisekunde = 0
let pocetakPaljbe = 500

/*** INIT ***/

const pozadina = new Pozadina(root + "slike/teksture/beton.gif")
const ranjenik = new Ranjenik()
const vreme = new Vreme()
const ui = new UI(sablon)

/*** FUNKCIJE ***/

function pali() {
  if (protekleMilisekunde < pocetakPaljbe || ovajPlotun >= BROJ_PLOTUNA) return
  plotuni.push(new Paljba())
  if (ranjenik.sudara(plotuni[ovajPlotun])) ranjenik.pogodjen += 1
  pocetakPaljbe += RITAM_PALJBE
  ovajPlotun++
}

function sablon() {
  return `
    Pogoci: ${ranjenik.pogodjen}
    Vreme: ${Math.floor(vremeIgre)}
  `
}

export default class RanjenikPaljba extends Scena {
  constructor() {
    super()
    this.dodaj(pozadina, ranjenik, ui)
  }

  update() {
    super.update()
    pali()
    plotuni.map(plotun => plotun.update())
    this.proveriVreme()
  }

  proveriVreme() {
    protekleMilisekunde = vreme.proteklo
    vremeIgre = vreme.protekloSekundi
    if (vremeIgre > ZADATO_VREME) {
      this.stop()
      // javi game over
    }
  }
}
