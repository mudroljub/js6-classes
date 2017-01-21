import * as $ from '../konstante';
import * as _ from '../funkcije';
import {Igrac} from '../core/Igrac';

const OKRET = _.uRadijane(2);

export class Ranjenik extends Igrac {

  constructor(scena) {
    super (scena, $.root + "slike/2d-odozgo/ranjeni-partizan.png", 70, 30);
    this.korak = 1;
    this.pogodjen = 0;
  }

  nalevo() {
    this.ugao -= OKRET;
  }

  nadesno() {
    this.ugao += OKRET;
  }

  nagore() {
    this.predjiRastojanje(this.korak);
  }

  nadole() {
    this.predjiRastojanje(-this.korak/5);
  }

}
