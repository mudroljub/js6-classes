import * as $ from '../konstante';
import {Predmet} from '../core/Predmet';

// rafaktor u Dolazno
export class Oblak extends Predmet {

  constructor(scena, brzina) {
    super(scena, $.root + "slike/oblak.gif", 150, 100);
    this.scena = scena;
    this.reset(brzina);
  }

  reset(brzina) {
    this.dy = Math.random() * brzina + 5;
    this.dx = Math.random() * 10 - 5;
    var newX = Math.random() * this.scena .sirina;
    this.polozaj(newX, 50);
  }

  proveriGranice() {
    if (this.y > this.scena .visina) {
      this.reset();
    }
  }

} // oblak
