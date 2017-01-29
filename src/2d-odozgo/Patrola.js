import {root} from '../konstante'
import {kruzi} from '../akcije/granice'
import Predmet from '../core/Predmet'

let brojac = 0

export default class Patrola extends Predmet {

  constructor(src = `${root}slike/2d-odozgo/nemci-patrola.gif`) {
    super(src)
    this.zvuk = new Audio(`${root}zvuci/halt.mp3`)
    this.brzina = 6
    this.granice = kruzi
  }

  update() {
    super.update()
    this.zuji()
  }

  zuji() {
    if (this.brzina === 0) return
    if (Math.random() > 0.5) return
    var nasumicno = Math.random() * Math.PI/2 - Math.PI/4
    this.ugao += nasumicno
  }

  vikni(brojPuta) {
    this.zvuk.play()
    brojac++
    this.zvuk.onended = () => {
      if (brojac >= brojPuta) return
      this.vikni(brojPuta)
    }
  }

  stop() {
    this.brzina = 0
  }
}
