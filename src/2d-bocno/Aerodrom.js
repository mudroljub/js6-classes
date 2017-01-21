import * as $ from '../konstante';
import {Predmet} from '../core/Predmet'

export class Aerodrom extends Predmet {

  constructor(scena, src = $.root + "slike/2d-bocno/zgrade/aerodrom.png") {
    super(scena, src);
    this.tlo(scena.visina);
  }

}
