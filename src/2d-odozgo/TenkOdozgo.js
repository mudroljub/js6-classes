import * as $ from '../konstante';
import {Predmet} from '../core/Predmet';
import {Zvuk} from '../core/Zvuk';

export class TenkOdozgo extends Predmet {

  constructor(scena, x = 100, y = 200) {
    super(scena, $.root + "slike/2d-odozgo/tenk-rdjavi.gif", 168, 70);
    this.x = x;
    this.y = y;
    this.tenkMp3 = new Zvuk($.root + "zvuci/zvuk-tenka.mp3");
    this.dodajSilu(0, 3);
  }

  patroliraj() {
    if (this.x >= 600) {
      this.ugao = $.TAU / 2;
    }
    if (this.x <= 150) {
      this.ugao = 0;
    }
  }

}
