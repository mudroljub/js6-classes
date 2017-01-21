import * as $ from '../konstante';
import {Predmet} from '../core/Predmet';

export class Okean extends Predmet {

  constructor(scena, brzinaPozadine = 10, sirina = 800, visina = 1440) {
    super(scena, $.root + "slike/teksture/okean.gif", sirina, visina);
    this.dx = 0;
    this.dy = brzinaPozadine;
    this.polozaj(sirina/2, 0);
  }

  update() {
    super.update();
    this.ponavljaSliku();
  }

  ponavljaSliku() {
    if (this.y > this.visina/2) this.polozaj(this.sirina/2, -this.visina/12);
  }

}
