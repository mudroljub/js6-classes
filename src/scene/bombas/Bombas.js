import tipke from 'io/tipke'
import mish from 'io/mish'
import Igrac from 'core/Igrac'

export default class Bombas extends Igrac {

  constructor(slika, sirina, visina) {
    super(slika, sirina, visina)
    this.tipke = tipke
    this.mish = mish
    this.potisak = 2.4
    this.prohodnost = 0.7
    this.polozaj(100, 100)
  }

  puca() {
    console.log('bacaBombu')
  }

  reset () {
    this.polozaj(Math.random() * 800, Math.random() * 600)
    this.brzina = 0
  }
}
