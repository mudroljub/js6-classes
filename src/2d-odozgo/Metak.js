import {Predmet} from '../core/Predmet';
import * as $ from '../konstante';

export class Metak extends Predmet {

  constructor(scena, vlasnik) {
    super(scena, $.root + "slike/granata.gif")
    this.prevelicaj(0.5);
    this.vlasnik = vlasnik;
    this.ugao = this.vlasnik.ugao;
    this.granicnik = $.NESTANI;
    this.sakrij();
  }

  puca(odstupanje = 0) {
    this.pokazi();
    this.polozaj(this.vlasnik.x, this.vlasnik.y - this.vlasnik.visina/4);
    this.ugao += odstupanje;
    this.brzina = 20;
  }

}
