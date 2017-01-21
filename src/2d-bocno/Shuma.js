import * as $ from '../konstante';
import {Predmet} from '../core/Predmet';

export class Shuma extends Predmet {

  constructor(scena, src = $.root + "slike/2d-bocno/priroda/shumarak.png", nivoTla = scena.nivoTla) {
    super(scena, src);
    this.x = Math.random() * scena.sirina;
    this.tlo(nivoTla + 5);
  }

}
