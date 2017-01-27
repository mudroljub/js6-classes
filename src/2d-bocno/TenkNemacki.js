import * as $ from '../konstante'
import {TenkBocnoIgrac} from './TenkBocnoIgrac'

export class TenkNemacki extends TenkBocnoIgrac  {

  constructor(x = 650, y = 450) {
    super($.root + "slike/2d-bocno/nemacki-tenk-bez-cevi.png", false, 82, 32)
    this.postaviCev($.root + "slike/2d-bocno/nemacki-tenk-cev.png", 100, 7)
    this.polozaj(x, y)
  }

}
