import {Predmet} from '../core/Predmet'
import {root} from '../konstante'

export class Metak extends Predmet {

  constructor(vlasnik) {
    super(root + "slike/granata.gif")
    this.prevelicaj(0.5)
    this.vlasnik = vlasnik
    this.ugao = this.vlasnik.ugao
    this.sakrij()
  }

  puca(odstupanje = 0) {
    this.pokazi()
    this.polozaj(this.vlasnik.x, this.vlasnik.y - this.vlasnik.visina/4)
    this.ugao += odstupanje
    this.brzina = 20
  }

}
