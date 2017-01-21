import {Predmet} from '../core/Predmet';
import * as $ from '../konstante';

export class Paljba extends Predmet {

  constructor(scena) {
    super(scena, $.root + "slike/2d-odozgo/krater.gif", 100, 74)
    this.postaviRandom();
  }

}
