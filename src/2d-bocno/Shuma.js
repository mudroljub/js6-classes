import * as $ from '../konstante';
import {Predmet} from '../core/Predmet';
import platno from '../io/platno';

export class Shuma extends Predmet {

  constructor(scena, src = $.root + "slike/2d-bocno/priroda/shumarak.png", nivoTla = platno.visina) {
    super(scena, src);
    this.x = Math.random() * platno.sirina;
    this.tlo(nivoTla + 5);
  }

}
