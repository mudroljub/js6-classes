// h1: Bekstvo iz Jasenovca

import * as $ from '../konstante';
import {Scena} from '../core/Scena';
import {Predmet} from '../core/Predmet';
import {Pozadina} from '../core/Pozadina';
import {TenkOdozgo} from '../2d-odozgo/TenkOdozgo';

/*** INIT ***/

const pozadina = new Pozadina($.root + "slike/teksture/beton.gif");
const tenk = new TenkOdozgo(100, 200);
const zica = new Predmet(null, $.root + "slike/2d-bocno/stvari/bodljikava-zica.gif");

/*** EXPORT ***/

export default class Jasenovac extends Scena {
  constructor() {
    super()
    zica.polozaj(400, 100);
  }

  update() {
    this.cisti();
    pozadina.update();
    zica.update();
    tenk.patroliraj();
    tenk.update();
  }
}
