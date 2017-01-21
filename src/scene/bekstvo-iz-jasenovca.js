// h1: Bekstvo iz Jasenovca

import * as $ from '../konstante';
import {Scena} from '../core/Scena';
import {Predmet} from '../core/Predmet';
import {Pozadina} from '../core/Pozadina';
import {TenkOdozgo} from '../2d-odozgo/TenkOdozgo';

/*** INIT ***/

const scena = new Scena(update);
const pozadina = new Pozadina(scena, $.root + "slike/teksture/beton.gif");
const tenk = new TenkOdozgo(scena, 100, 200);
const zica = new Predmet(scena, $.root + "slike/2d-bocno/stvari/bodljikava-zica.gif");
zica.polozaj(400, 100);

function update() {
  scena.cisti();
  pozadina.update();
  zica.update();
  tenk.patroliraj();
  tenk.update();
}

/*** EXPORT ***/

export default scena
