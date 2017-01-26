import {Predmet} from '../core/Predmet';
import * as $ from '../konstante';

export class Granata extends Predmet {

  constructor(vlasnik, src = $.root + "slike/granata.gif") {
    super(null, src, 24, 6);
    this.sakrij();
    this.vlasnik = vlasnik;
  }

  puca() {
    this.pokazi();
    this.brzina = 20;
    this.granicnik = $.NESTANI;
    this.polozaj(this.vlasnik.x, this.vlasnik.y);
    this.ugao = this.vlasnik.ugao;
  }

}
