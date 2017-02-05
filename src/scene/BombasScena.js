// napraviti css ui i uvek njega koristiti
// sukcesivno se povećava broj prepreka i težina igre
  // svaki nivo novi random raspored, igrač igra dok ne izgubi
// minimalno rastojanje bombaša i bunkera?
// vremenski ograniceno?
// mitraljez puca iz bunkera, prepreke su zakloni

import {root} from '../konstante'
import Scena from 'core/Scena'
import Vreme from 'core/Vreme'
import Pozadina from 'core/Pozadina'
import UI from 'core/UI'
import {Bombas} from '../2d-bocno/Bombas'
import {Bunker} from '../2d-bocno/Bunker'
import {Prepreka} from '../2d-bocno/Prepreka'

/*** KONFIG ***/

const ZADATOVREME = 50
const BROJ_PREPREKA = 10
const prepreke = []
let nivo = 1
let vremeIgre = 0
let prikaziMeni = false
let poruka = ''

/*** INIT ***/

const sablon = () => {
  const izborCss = prikaziMeni ? 'block' : 'none'
  const prozorce = `
    <div class='prozorce centar ${izborCss}'>
      <p>${poruka}</p>
      <a class='pointer'>Igraj opet</a></br>
      <a class='pointer'>Glavni meni</a>
    </div>
  `
  return `
    <main class='centar'>
      <h1>${BombasScena.naziv}</h1>
      <h3>Dovedi Žikicu Jovanovića Španca do nemačkog bunkera! </h3>
      <div class="tabela">
        Nivo: ${nivo} <br>
        Vreme: ${Math.floor(vremeIgre)} <br>
        Prepreke: ${BROJ_PREPREKA}
      </div>
    </main>
    ${prozorce}
  `
}

const ui = new UI(sablon, 'ui')
const vreme = new Vreme()
const pozadina = new Pozadina(root + "slike/teksture/beton.gif")
const bombas = new Bombas(root + "slike/2d-bocno/partizani/vojnici/bombasi/partizan-bombas.gif", 50, 55)
const bunker = new Bunker(112, 103)
bunker.nemojPreko(bombas)

export default class BombasScena extends Scena {
  static get naziv() {
    return "Bitka za Krupanj 1941."
  }

  constructor() {
    super()
    this.dodaj(pozadina, bunker, bombas)
    this.praviPrepreke()
  }

  update() {
    super.update()
    // bombas.pratiMisha()
    this.proveriVreme()
    this.proveriPobedu()
    this.proveriPrepreke()
  }

  render() {
    super.render()
    ui.render()
  }

  praviPrepreke() {
    for (let i = 0; i < BROJ_PREPREKA; i++) {
      prepreke[i] = new Prepreka([bunker, bombas])
    }
  }

  proveriPobedu() {
    if (bombas.razmakDo(bunker) < 75) {
      bunker.gori()
      this.zavrsiIgru('Neprijateljski bunker je uništen.')
    }
  }

  proveriVreme() {
    vremeIgre = vreme.protekloSekundi
    if (vremeIgre > ZADATOVREME) {
      this.zavrsiIgru('Tvoje vremeIgre je isteklo. Igra je završena!')
    }
  }

  proveriPrepreke() {
    for (let i = 0; i < BROJ_PREPREKA; i++) {
      if (bombas.sudara(prepreke[i])) {
        this.zavrsiIgru('Poginuo si. Igra je završena.')
      }
      prepreke[i].update()
    }
  }

  zavrsiIgru(text) {
    poruka = text
    prikaziMeni = true
    this.stop()
  }
}
