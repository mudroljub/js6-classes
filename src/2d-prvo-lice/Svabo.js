import {root} from '../konstante'
import Predmet from '../core/Predmet'
import Vreme from '../core/Vreme'
import mish from '../io/mish'

const VREME_NISANJENJA = 3

export class Svabo extends Predmet {

  constructor (sirina = 100, visina = 150, PROCENAT_POJAVLJIVANJA = 0.003) {
    super (root + "slike/2d-prvo-lice/rov-prazan.gif", sirina, visina)
    this.stoji = false
    this.slikaGore = root + "slike/2d-prvo-lice/nemac-rov.gif"
    this.slikaDole = root + "slike/2d-prvo-lice/rov-prazan.gif"
    this.PROCENAT_POJAVLJIVANJA = PROCENAT_POJAVLJIVANJA
    this.VREME_NISANJENJA = VREME_NISANJENJA //koliko sekundi stoji pre nego zapuca
    this.vreme = new Vreme()
  }

  update() {
    super.update()
    this.povremenoUstaje()
  }

  povremenoUstaje() {
    if (!this.stoji && Math.random() < this.PROCENAT_POJAVLJIVANJA) this.ustani()
  }

  stav(bul) {
    this.stoji = bul
    let slika = bul ? this.slikaGore : this.slikaDole
    this.zameniSliku(slika)
    if (bul) this.vreme.reset() // startuje tajmer
  }

  ustani() {
    this.stav(true)
  }

  padni() {
    this.stav(false)
  }

  puca() {
    this.slika.src = root + "slike/2d-prvo-lice/nemac-rov-puca.gif"
  }

  jePogodjen() {
    return this.stoji && mish.iznad(this)
  }

  jeSpreman() {
    if (!this.stoji) return false
    let duzinaOstanka = this.vreme.protekloSekundi
    if (duzinaOstanka <= this.VREME_NISANJENJA / 2) return false
    if (duzinaOstanka > this.VREME_NISANJENJA) return true
  }
}
