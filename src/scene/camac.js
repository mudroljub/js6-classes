// beskonačan ekran nadesno
// mozda ubaciti obale da promiču
// nailazi na prepreke, stenje, brodolomnike, čamce, krstarice, brodove....

import {Scena} from '../core/Scena';
import {CamacIgracOdozgo} from '../2d-odozgo/CamacIgracOdozgo';

/*** INIT ***/

const scena = new Scena(update);
scena.bojaPozadine = "#000066";
const camac = new CamacIgracOdozgo(scena);

function update() {
  scena.cisti();
  camac.update();
}

/*** EXPORT ***/

export default scena
