import Predmet from 'core/Predmet';
import {root} from '../konstante';

export class Paljba extends Predmet {

  constructor() {
    super(root + "slike/2d-odozgo/krater.gif", 100, 74)
    this.postaviRandom();
  }

}
