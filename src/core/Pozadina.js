import {Predmet} from '../core/Predmet';
import platno from '../io/platno'

export class Pozadina extends Predmet {

  constructor(slika) {
    super(null, slika, platno.sirina, platno.visina);
    this.x = platno.sirina / 2;
    this.y = platno.visina / 2;
    this.oznake.pozadina = true;
  }

} // Pozadina
