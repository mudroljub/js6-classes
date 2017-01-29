import Predmet from '../core/Predmet';
import {root} from '../konstante';

export class Prepreka extends Predmet {

  constructor(nizPredmeta) {
    super(root + "slike/2d-bocno/stvari/kutija.png", 50, 50);
    this.nemojPreko (nizPredmeta);
  }

  nemojPreko (nizPredmeta) {
    this.postaviRandom();
    for (var i = 0; i < nizPredmeta.length; i++) {
      if (this.sudara(nizPredmeta[i])) this.nemojPreko(nizPredmeta);
    }
  }

}
