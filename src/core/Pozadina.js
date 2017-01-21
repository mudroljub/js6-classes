import {Predmet} from '../core/Predmet';

export class Pozadina extends Predmet {

  constructor(scena, slika) {
    super(scena, slika, scena.sirina, scena.visina);
    this.x = scena.sirina / 2;
    this.y = scena.visina / 2;
    this.oznake.pozadina = true;
  }

} // Pozadina
