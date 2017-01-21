import * as $ from '../konstante';
import {Animiran} from '../core/Animiran';

export class Okupator extends Animiran {

  constructor (scena) {
    super (scena, $.root + "slike/sprajtovi/okupator-sprite.png", ["nagore", "nadole", "nalevo", "nadesno", "umire"], 5);
    this.sirina = 50;
    this.visina = 180;
    this.scena = scena;
    this.brzina = 4;
    this.limitLevo = this.scena.sirina * 1/6;
    this.limitDesno = this.scena.sirina * 5/6;
    this.polozaj(this.limitLevo, 450);
    this.duzinaAnimacije = 500;
  }

  patroliraj() {
    if (this.x <= this.limitLevo) this.hodaj("nadesno", 0);
    if (this.x >= this.limitDesno) this.hodaj("nalevo", 180);
  }

  hodaj(imeAnimacije, ugao) {
    this.postaviAnimaciju(imeAnimacije);
    this.ugaoKretanja = ugao;
  }

  proveriPogodak() {
    if (this.jeMishIznad()) this.umri();
  }

  umri() {
    super.umri();
    this.postaviAnimaciju("umire");
    this.nePonavljaAnimaciju("umire");
  }

} // Okupator
