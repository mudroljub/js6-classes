import {Predmet} from '../core/Predmet';
import * as $ from '../konstante';
import platno from '../io/platno'

export class Ostrvo extends Predmet {

  constructor(brzina) {
    super(null, $.root + "slike/2d-odozgo/ostrvo.gif", 100, 100);
    this.reset(brzina);
  }

  reset(brzina) {
    this.dy = brzina || 10;
    this.dx = 0;
    var newX = Math.random() * platno.sirina;
    this.polozaj(newX, 50);
  }

  proveriGranice() {
    if (this.y > platno.visina) {
      this.reset();
    }
  }

}
