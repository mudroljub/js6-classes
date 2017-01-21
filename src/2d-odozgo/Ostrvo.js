import {Predmet} from '../core/Predmet';
import * as $ from '../konstante';

export class Ostrvo extends Predmet {

  constructor(scena, brzina) {
    super(scena, $.root + "slike/2d-odozgo/ostrvo.gif", 100, 100);
    this.scena = scena;
    this.reset(brzina);
  }

  reset(brzina) {
    this.dy = brzina || 10;
    this.dx = 0;
    var newX = Math.random() * this.scena.sirina;
    this.polozaj(newX, 50);
  }

  proveriGranice() {
    if (this.y > this.scena.visina) {
      this.reset();
    }
  }

}
