import * as $ from '../konstante';
import {Predmet} from '../core/Predmet'

export class Aerodrom extends Predmet {

  constructor(nivoTla, src = $.root + "slike/2d-bocno/zgrade/aerodrom.png") {
    super(null, src);
    this.tlo(nivoTla);
  }

}
