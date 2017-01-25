import * as $ from '../konstante';
import {TenkBocnoIgrac} from './TenkBocnoIgrac';

export class TenkPartizanski extends TenkBocnoIgrac  {

  constructor(nivoTla, x = 100) {
    super(null, $.root + "slike/2d-bocno/partizanski-tenk-bez-cevi.png", true, 75, 32);
    this.postaviCev($.root + "slike/2d-bocno/partizanski-tenk-cev.png", 100, 7);
    this.polozaj(x, nivoTla);
  }

}
