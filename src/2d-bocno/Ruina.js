import * as $ from '../konstante';
import {Predmet} from '../core/Predmet'

export class Ruina extends Predmet {

  constructor(scena, src = $.root + "slike/2d-bocno/zgrade/ruina.png") {
    super(scena, src);
    this.tlo(scena.visina);
  }

}
