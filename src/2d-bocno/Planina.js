import * as $ from '../konstante'
import {Predmet} from '../core/Predmet'
import platno from '../io/platno'
import {kruzi} from '../akcije/granice'

export class Planina extends Predmet {

  constructor(nivoTla, src = $.root + "slike/2d-bocno/planine.png") {
    super (src);
    this.x = Math.random() * platno.width;
    this.tlo(nivoTla + 3);
    this.granice = kruzi
  }

}
