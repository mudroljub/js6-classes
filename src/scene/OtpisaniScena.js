import * as $ from '../konstante'
import {UI} from '../core/UI'
import {Scena} from '../core/Scena'
import {Pozadina} from '../core/Pozadina'
import {Nishan} from '../core/Nishan'
import {Okupator} from '../2d-prvo-lice/Okupator'

/*** KONFIG ***/

const interfejs = `
  <h1>Ubij okupatora!</h1>
  <audio controls autoplay preload="auto">
    <source src="../../zvuci/otpisani.mp3" type="audio/mpeg">
    <source src="../../zvuci/otpisani.ogg" type="audio/ogg">
  </audio>
`

/*** INIT ***/

const pozadina = new Pozadina($.root + "slike/pozadine/rusevine-varsava.jpg")
const strazar = new Okupator()
const ui = new UI()

/*** EXPORT ***/

export default class OtpisaniScena extends Scena {
  constructor() {
    super()
    new Nishan()
    ui.dodaj(interfejs)
    this.platno.addEventListener('click', () => strazar.proveriPogodak())
  }

  update() {
    pozadina.update()
    strazar.patroliraj()
    strazar.update()
  }
}
