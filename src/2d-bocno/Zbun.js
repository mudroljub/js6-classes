import * as $ from '../konstante';
import * as _ from '../funkcije';
import {Predmet} from '../core/Predmet';

export class Zbun extends Predmet {

  constructor(scena, src = $.root + "slike/2d-bocno/priroda/zbun.png") {
    super (scena, src);
    this.polozaj(Math.random() * scena.sirina, _.randomRange(scena.nivoTla - this.visina/2, scena.visina));
  }

}
