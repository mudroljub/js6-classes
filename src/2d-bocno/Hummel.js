import * as $ from '../konstante';
import {VoziloBocno} from './VoziloBocno';
import {Raketa} from './Raketa';

const SANSA_PUCNJA = 0.01;

export class Hummel extends VoziloBocno {

  constructor(nivoTla) {
    super(nivoTla, $.root + "slike/2d-bocno/hummel.png", 150, 70);
    this.slikaMrtav = $.root + "slike/2d-bocno/unisten-tenk-gori.png";
    this.oznake.neprijatelj = true;
    this.raketa = new Raketa(this);
    this.raketa.cilj = "igrac";
  }

  update() {
    super.update();
    // this.povremenoPuca();
    this.raketa.update();
  }

  povremenoPuca() {
    if (!this.ziv) return;
    if (Math.random() < SANSA_PUCNJA) this.puca();
  }

  puca() {
    this.raketa.pucaPratecu();
  }

}
