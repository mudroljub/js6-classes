import * as $ from '../konstante';
import {Igrac} from '../core/Igrac';
import {Granata} from './Granata';


export class VoziloIgracOdozgo extends Igrac {

  constructor(scena, slika, sirina, visina) {
    super(scena, slika, sirina, visina);
    this.potisak = 2;
    this.prohodnost = 0.85;
    this.granata = new Granata(scena, this);
    this.podesiTipke($.LEVO, $.DESNO, $.GORE, $.DOLE);
    this.komandeNapredne = true;
    this.granicnik = $.ODBIJA;
  }

  update() {
    super.update();
    this.granata.update();
  }

  puca() {
    this.granata.puca();
  }

}
