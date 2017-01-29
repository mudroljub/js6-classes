import * as $ from '../konstante'
import {UI} from '../core/UI'
import {Scena} from '../core/Scena'
import {Zvuk} from '../core/Zvuk'
import {Pozadina} from '../core/Pozadina'
import {Okupator} from '../2d-prvo-lice/Okupator'
import platno from '../io/platno'
import mish from '../io/mish'

/*** KONFIG ***/

const sablon = () => `
<main class='centar'>
  <h1>${OtpisaniScena.naziv}</h1>
  <p>Oslobođenje se bliži</p>
</main>
`

/*** INIT ***/

const pozadina = new Pozadina($.root + "slike/pozadine/rusevine-varsava.jpg")
const strazar = new Okupator()

/*** EXPORT ***/

export default class OtpisaniScena extends Scena {
  constructor() {
    super()
    mish.dodajNishan()
    new Zvuk("../../zvuci/otpisani.mp3").play()
    this.dodaj(new UI(sablon))
    platno.addEventListener('click', () => strazar.proveriPogodak())
  }

  static get naziv() {
    return "Ubij okupatora!"
  }

  update() {
    pozadina.update()
    strazar.patroliraj()
    strazar.update()
  }

  end() {
    super.end()
    mish.ukloniNishan()
  }
}
