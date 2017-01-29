// ubaciti jednog neprijatelja i jednu stvar za hvatanje (paketić)
// senku ispod aviona, kao u avion.png

import UI from '../core/UI'
import Scena from '../core/Scena'
import {Avionce} from '../2d-odozgo/Avionce'
import {Okean} from '../2d-odozgo/Okean'
import {Ostrvo} from '../2d-odozgo/Ostrvo'
import {Oblak} from '../2d-odozgo/Oblak'
import platno from '../io/platno'

/*** KONFIG ***/

let poeni = 0
let zivoti = 3
const oblaci = []
const brojOblaka = 3
const brzinaPozadine = 10

const sablon = () => {
  return `
    <h1>${Scena1944.naziv}</h1>
    Poeni: ${poeni}<br>
    Životi: ${zivoti}<br>
    Meci: ${igrac.preostaloMetaka()}
  `
}

const ostrvo = new Ostrvo(brzinaPozadine)
const igrac = new Avionce()

export default class Scena1944 extends Scena {
  static get naziv() {
    return "Osvetnik pete ofanzive"
  }

  constructor() {
    super()
    const interfejs = new UI(sablon)
    const pozadina = new Okean(brzinaPozadine, platno.width)
    for (let i = 0; i < brojOblaka; i++) oblaci[i] = new Oblak(brzinaPozadine)
    this.dodaj(pozadina, ostrvo, igrac, ...oblaci, interfejs)
  }

  update() {
    super.update()
    this.proveriSudare()
  }

  proveriSudare() {
    if (igrac.sudara(ostrvo)) {
      ostrvo.reset()
      zivoti--
    }
    oblaci.map(oblak => {
      if (igrac.sudara(oblak)) {
        oblak.reset()
        poeni++
      }
    })
  }

  end() {
    super.end()
    igrac.zvukMotora.pause()
  }
}
