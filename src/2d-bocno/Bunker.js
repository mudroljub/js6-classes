import {Predmet} from '../core/Predmet';
import * as $ from '../konstante';

export class Bunker extends Predmet {

  constructor(scena, sirina, visina){
    super(scena, $.root + "slike/2d-bocno/kuca-bunker.png", sirina, visina)
    this.brzina = 0;
    this.polozaj(400, 100);
  }

  nemojPreko(predmet) {
    this.postaviRandomUredno();
    if (this.razmakDo(predmet) < 150) {
      this.nemojPreko(predmet);
    }
  }

  gori() {
    this.slika.src = $.root + "slike/2d-bocno/kuca-bunker-gori.png";
  }

}
