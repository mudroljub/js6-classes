import * as $ from '../konstante'
import {UI} from '../core/UI'
import {Scena} from '../core/Scena'
import {Zvuk} from '../core/Zvuk'
import {Pozadina} from '../core/Pozadina'
import {Nishan} from '../core/Nishan'
import {Okupator} from '../2d-prvo-lice/Okupator'
import platno from '../io/platno'

/*** KONFIG ***/

const sablon = () => `
<main class='centar'>
  <h1>Ubij okupatora!</h1>
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
    new Nishan()
    new Zvuk("../../zvuci/otpisani.mp3").play()
    this.dodaj(new UI(sablon))
    platno.addEventListener('click', () => strazar.proveriPogodak())
  }

  update() {
    pozadina.update()
    strazar.patroliraj()
    strazar.update()
  }
}
