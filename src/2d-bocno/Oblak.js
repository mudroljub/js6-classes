import * as $ from '../konstante';
import * as _ from '../funkcije';
import {Predmet} from '../core/Predmet';
import platno from '../io/platno';

export class Oblak extends Predmet {

  constructor(scena, sirina, visina, src = $.root + "slike/oblak.gif") {
    super(scena, src, sirina, visina);
    this.polozaj(Math.random() * platno.sirina, _.randomRange(0, platno.visina - this.visina));
    this.dy = Math.random() * 2 - 1;  // random vertikalno kretanje
  }

  update() {
    super.update();
    this.proveriGranice();
  }

  proveriGranice() {
    if (this.y < -this.platno.visina) this.dy = -this.dy;  // dozvoljena visina dve scene
    if (this.y > this.platno.visina - this.visina) this.dy = -this.dy;
  }

}
