// da patrola malo drzi pravac
// da kaze halt
// staviti naznaku da ranjenik moze da izadje sa scene
// iskoristiti za Bekstvo iz Jasenovca i Stradanje ranjenika na Sutjesci
// u jasenovcu beton i trebalo bi ustase, a na sutjesci nemci, italijani, cetnici

import {root} from '../konstante'
import {Scena} from '../core/Scena'
import {Pozadina} from '../core/Pozadina'
import {Ranjenik} from '../2d-odozgo/Ranjenik'
import {Patrola} from '../2d-odozgo/Patrola'

/*** KONFIG ***/

let postavka = 0

/*** INIT ***/

const pozadina = new Pozadina(root + "slike/2d-odozgo/shumarak-pozadina.png")
const ranjenik = new Ranjenik()
const patrola = new Patrola(root + "slike/2d-odozgo/nemci-patrola.gif")

export default class RanjenikScena extends Scena {
  static get naziv() {
    return "Bekstvo ranjenika"
  }

  constructor() {
    super()
    ranjenik.polozaj(this.sirina / 4, this.visina / 2)
    patrola.polozaj(this.sirina * 3/4, this.visina * 3/4)
  }

  update() {
    this.cisti()
    pozadina.update()
    ranjenik.update()
    patrola.update()
    this.proveriSudare()
    this.proveriPobedu()
  }

  proveriSudare() {
    if (patrola.sudara(ranjenik)) {
      patrola.stop()
      patrola.vikni(3)
      this.stop()
    }
  }

  proveriPobedu() {
    if (jeRanjenikIzasao(this)) promeniPostavku()
    if (postavka > 3) {
      console.log("pobeda!")
      this.stop()
    }
  }

  end() {
    super.end()
    patrola.zvuk.pause()
  }
}

/*** FUNKCIJE ***/

function jeRanjenikIzasao(scena) {
  return ranjenik.x > scena.sirina - ranjenik.sirina
}

function promeniPostavku() {
  let isEven = postavka % 2 === 0
  let slikaPozadine = isEven ? "slike/teksture/beton.gif" : "slike/2d-odozgo/shumarak-pozadina.png"
  let slikaPatrole = isEven ? "slike/2d-odozgo/talijani-patrola.gif" : "slike/2d-odozgo/nemci-patrola.gif"
  pozadina.zameniSliku(root + slikaPozadine)
  patrola.zameniSliku(root + slikaPatrole)
  patrola.postaviRandom()
  ranjenik.x = 10
  postavka++
}
