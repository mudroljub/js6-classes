import * as $ from '../konstante';
import {Predmet} from '../core/Predmet';

export class VoziloBocno extends Predmet {

  constructor(scena, src, sirina, visina) {
    super(scena, src, sirina, visina);
    this.dodajSilu(this.ugao, 3);
    this.x = 100;
    this.y = scena.visina - this.visina / 2;
  }

  patroliraj() {
    if (this.mrtav) return;
    if (this.x <= 150) {
      this.ugao = 0;
      this.skalarY = 1;
      this.brzina = 3;
    }
    if (this.x >= 600) {
      this.ugao = $.TAU / 2;
      this.skalarY = -1;
      this.brzina = 3;
    }
  }

}
