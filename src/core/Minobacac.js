// odvojiti projektil

import * as $ from '../konstante'
import {tipke} from '../io/tipke'
import {podloga} from '../io/platno'
import {Kvadrat} from './Kvadrat'

const GRAVITACIJA = 0.9;
const POMERAJ_UGLA = 0.008;
const POMERAJ_BRZINE = 0.3;
const DJULE_POLUPRECNIK = 10;

export class Minobacac extends Kvadrat {

  constructor(x, y, sirina, visina, boja="rgb(40,40,0)") {
    super(x, y, sirina, visina, boja)
    this.ugao = 0.5;
    this.brzina = 20;
    this.djule = new Djule(this, DJULE_POLUPRECNIK);
  }

  update() {
    this.proveriTipke()
    this.djule.update()
    this.crta()
  }

  crta() {
    podloga.save();
    podloga.translate(this.x, this.y);
    podloga.rotate(-this.ugao);
    podloga.translate(-this.x, -this.y);
    super.crta();
    podloga.restore();
  }

  dodajUgao(y) {
    this.ugao += y;
  }

  dodajBrzinu(x) {
    this.brzina += x;
  }

  dajDx() {
    return this.brzina * Math.cos(this.ugao);
  }

  dajDy() {
    return -this.brzina * Math.sin(this.ugao);
  }

  dajVrhCeviX() {
    return this.x + this.sirina * Math.cos(this.ugao);
  }

  dajVrhCeviY() {
    return this.y + (this.visina * 0.5) - this.sirina * Math.sin(this.ugao);
  }

  pali() {
    this.djule.pali();
  }

  proveriTipke() {
    if (tipke.stisnute[$.RAZMAK]) this.pali();
    if (tipke.stisnute[$.GORE]) this.dodajUgao(POMERAJ_UGLA);
    if (tipke.stisnute[$.DOLE]) this.dodajUgao(-POMERAJ_UGLA);
    if (tipke.stisnute[$.LEVO]) this.dodajBrzinu(-POMERAJ_BRZINE);
    if (tipke.stisnute[$.DESNO]) this.dodajBrzinu(POMERAJ_BRZINE);
    if (this.brzina <= 0) this.brzina = 0;
  }
}


class Djule {
  constructor(minobacac, poluprec, boja="rgb(250,0,0)") {
    this.minobacac = minobacac;
    this.poluprec = poluprec;
    this.boja = boja;
    this.ispaljeno = false;
  }

  update() {
    if (!this.ispaljeno) return;
    this.leti()
    this.crta()
  }

  pripremi() {
    this.dx = this.minobacac.dajDx();
    this.dy = this.minobacac.dajDy();
    this.x = this.minobacac.dajVrhCeviX() - this.dx;
    this.y = this.minobacac.dajVrhCeviY() - this.dy;

  }

  pali() {
    this.pripremi();
    this.ispaljeno = true;
  }

  leti() {
    this.dy = this.dy + GRAVITACIJA;
    this.x += this.dx;
    this.y += this.dy;
  }

  crta() {
    podloga.fillStyle = this.boja;
    podloga.beginPath();
    podloga.arc(this.x, this.y, this.poluprec, 0, Math.PI * 2, true);
    podloga.fill();
  }

  sudara(predmet) {
    return (this.x >= predmet.x) && (this.x <= (predmet.x + predmet.sirina)) &&
      (this.y >= predmet.y) && (this.y <= (predmet.y + predmet.visina));
  }
}
