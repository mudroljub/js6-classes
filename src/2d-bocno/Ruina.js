import * as $ from '../konstante';
import {Predmet} from '../core/Predmet'

export class Ruina extends Predmet {

  constructor(nivoTla, src = $.root + "slike/2d-bocno/zgrade/ruina.png") {
    super(null, src);
    this.tlo(nivoTla);
  }

}
