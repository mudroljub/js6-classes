import * as $ from '../konstante';
import * as _ from '../funkcije';
import {Predmet} from '../core/Predmet';
import platno from '../io/platno';

export class Zbun extends Predmet {

  constructor(src = $.root + "slike/2d-bocno/priroda/zbun.png") {
    super (null, src);
    this.polozaj(Math.random() * platno.sirina, _.randomRange(platno.visina - this.visina/2, platno.visina));
  }

}
