import * as $ from '../konstante';
import {Predmet} from '../core/Predmet';

export class Planina extends Predmet {

  constructor(scena, src = $.root + "slike/2d-bocno/planine.png") {
    super (scena, src);
    this.x = Math.random() * scena.sirina;
    this.tlo(scena.nivoTla + 3);
    this.granicnik = $.KRUZI
  }

}
