// srediti oblake
// ubaciti jednog neprijatelja i jednu stvar za hvatanje (paketić)
// senku ispod aviona, kao u avion.png

import {UI} from '../core/UI';
import {Scena} from '../core/Scena';
import {Avionce} from '../2d-odozgo/Avionce';
import {Okean} from '../2d-odozgo/Okean';
import {Ostrvo} from '../2d-odozgo/Ostrvo';
import {Oblak} from '../2d-odozgo/Oblak';

/*** KONFIG ***/

let poeni = 0;
let zivoti = 3
const oblaci = []
const BROJ_OBLAKA = 3
const BRZINA_POZADINE = 10
const naslov = "Osvetnik pete ofanzive"

const praviUI = () => {
  return `
    <h1>${naslov}</h1>
    Poeni: ${poeni}<br>
    Životi: ${zivoti}<br>
    Meci: ${avionce.preostaloMetaka()}
  `
}

const ostrvo = new Ostrvo(BRZINA_POZADINE)
const avionce = new Avionce()
const interfejs = new UI(praviUI)

export default class Osvetnik1944 extends Scena {
  constructor() {
    super()
    const pozadina = new Okean(this, BRZINA_POZADINE, window.innerWidth)
    this.dodaj(pozadina, ostrvo, avionce)
    praviOblake(this)
  }

  update() {
    super.update()
    azurirajOblake()
    this.proveriSudare()
  }

  render() {
    interfejs.render()
  }

  proveriSudare() {
    if (avionce.sudara(ostrvo)) {
      ostrvo.reset()
      zivoti--
    }
    oblaci.map(oblak => {
      if (avionce.sudara(oblak)) {
        oblak.reset()
        poeni++
      }
    })
  }
}

/*** FUNKCIJE ***/

function praviOblake(scena) {
  for (var i = 0; i < BROJ_OBLAKA; i++) oblaci[i] = new Oblak(scena, BRZINA_POZADINE)
}

function azurirajOblake() {
  for (var i = 0; i < BROJ_OBLAKA; i++) oblaci[i].update()
}
