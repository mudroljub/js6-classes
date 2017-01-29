import {root} from '../konstante';
import {VoziloIgracOdozgo} from '../2d-odozgo/VoziloIgracOdozgo';

export class TenkIgracOdozgo extends VoziloIgracOdozgo {

  constructor() {
    super(root + "slike/2d-odozgo/tenk-rdjavi.gif", 168, 70);
    this.prohodnost = 0.7;
  }

}
