import * as $ from '../konstante';
import {tipke} from '../io/tipke';
import {Predmet} from './Predmet';

const OKRET = 0.087;

export class Igrac extends Predmet {

  constructor(scena, src, sirina, visina) {
    super(scena, src, sirina, visina);
    this.oznake.igrac = true; // naslednik moze delete this.oznake.igrac da ukine tipke
    this.potisak = 0.5;
    this.prohodnost = 0.9;
    this.podesiTipke();
    this.komandeNapredne = false; // da se okreće oko svoje ose
  }

  update() {
    super.update();
    this.proveriTipke();
    this.praviTrenje();
  }

  podesiTipke(tipkaLevo = $.A, tipkaDesno = $.D, tipkaGore = $.W, tipkaDole = $.S, tipkaPucanje = $.RAZMAK) {
    this.tipkaLevo = tipkaLevo;
    this.tipkaDesno = tipkaDesno;
    this.tipkaGore = tipkaGore;
    this.tipkaDole = tipkaDole;
    this.tipkaPucanje = tipkaPucanje;
  }

  proveriTipke() {
    if (!this.ziv || !("igrac" in this.oznake)) return;
    if (tipke.stisnute[this.tipkaLevo]) this.nalevo();
    if (tipke.stisnute[this.tipkaDesno]) this.nadesno();
    if (tipke.stisnute[this.tipkaGore]) this.nagore();
    if (tipke.stisnute[this.tipkaDole]) this.nadole();
    if (tipke.stisnute[this.tipkaPucanje]) this.puca();
  }

  nalevo() {
    if (this.komandeNapredne) {
      this.ugao -= OKRET;
    } else {
      this.dodajSilu($.KRUZNICA / 2, this.potisak);
    }
  }

  nadesno() {
    if (this.komandeNapredne) {
      this.ugao += OKRET;
    } else {
      this.dodajSilu(0, this.potisak);
    }
  }

  nagore() {
    let ugao = this.komandeNapredne ? this.ugao : -$.KRUZNICA / 4;
    this.dodajSilu(ugao, this.potisak);
  }

  nadole() {
    let ugao = this.komandeNapredne ? this.ugao : $.KRUZNICA / 4;
    let potisak = this.komandeNapredne ? (-this.potisak / 10) : this.potisak;
    this.dodajSilu(ugao, potisak);
  }

  puca() {
    console.log('puca');
  }

  praviTrenje() {
    this.dx *= this.prohodnost;
    this.dy *= this.prohodnost;
  }

}
