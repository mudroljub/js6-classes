import UI from 'core/UI'
import Scena from 'core/Scena'
import Pozadina from 'core/Pozadina'
import {Okupator} from '../2d-prvo-lice/Okupator'
import platno from 'io/platno'
import mish from 'io/mish'
import slikaPozadina from 'slike/pozadine/rusevine-varsava.jpg'

/*** KONFIG ***/

const sablon = () => `
<main class='centar'>
  <h1>${OtpisaniScena.naziv}</h1>
  <p>Oslobođenje se bliži</p>
</main>
`

/*** INIT ***/

const pozadina = new Pozadina(slikaPozadina)
const strazar = new Okupator()

/*** EXPORT ***/

export default class OtpisaniScena extends Scena {
  static get naziv() {
    return 'Ubij okupatora!'
  }

  constructor() {
    super()
    mish.dodajNishan()
    this.zvuk = new Audio(__dirname + 'zvuci/otpisani.mp3')
    this.zvuk.play()
    this.dodaj(new UI(sablon))
    platno.addEventListener('click', () => strazar.proveriPogodak())
  }

  update() {
    pozadina.update()
    strazar.patroliraj()
    strazar.update()
  }

  end() {
    super.end()
    mish.ukloniNishan()
    this.zvuk.pause()
  }
}
