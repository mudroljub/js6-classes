import * as $ from '../konstante';
import * as _ from '../funkcije';
import {Predmet} from '../core/Predmet';

export class Oblak extends Predmet {

  constructor(scena, sirina, visina, src = $.root + "slike/oblak.gif") {
    super(scena, src, sirina, visina);
    this.polozaj(Math.random() * scena.sirina, _.randomRange(0, scena.visina - this.visina));
    this.dy = Math.random() * 2 - 1;  // random vertikalno kretanje
  }

  update() {
    super.update();
    this.proveriGranice();
  }

  proveriGranice() {
    if (this.y < -this.scena.visina) this.dy = -this.dy;  // dozvoljena visina dve scene
    if (this.y > this.scena.visina - this.visina) this.dy = -this.dy;
  }

}
