import * as $ from '../konstante'
import {Predmet} from '../core/Predmet'
import platno from '../io/platno'

export class Planina extends Predmet {

  constructor(nivoTla, src = $.root + "slike/2d-bocno/planine.png") {
    super (null, src);
    this.x = Math.random() * platno.sirina;
    this.tlo(nivoTla + 3);
    this.granicnik = $.KRUZI
  }

}
