import {Predmet} from '../core/Predmet'
import platno from '../io/platno'

export class Pozadina extends Predmet {

  constructor(slika) {
    super(null, slika, platno.width, platno.height)
    this.x = platno.width / 2
    this.y = platno.height / 2
    this.oznake.pozadina = true
  }

}
