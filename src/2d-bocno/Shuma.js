import * as $ from '../konstante';
import {Predmet} from '../core/Predmet';
import platno from '../io/platno';

export class Shuma extends Predmet {

  constructor(nivoTla = platno.visina, src = $.root + "slike/2d-bocno/priroda/shumarak.png") {
    super(null, src);
    this.x = Math.random() * platno.sirina;
    this.tlo(nivoTla + 5);
  }

}
