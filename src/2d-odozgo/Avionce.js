import * as $ from '../konstante';
import {Igrac} from '../core/Igrac';
import {Zvuk} from '../core/Zvuk';
import {Casovnik} from '../core/Casovnik';
import {Metak} from '../2d-odozgo/Metak';

const BROJ_METAKA = 999;
const SIRINA_PALJBE = 13;
const PAUZA_PALJBE = 0.1;

export class Avionce extends Igrac {

  constructor(scena) {
    super(scena, $.root + "slike/2d-odozgo/avionce.gif");
    this.scena = scena;
    this.prevelicaj(0.75);
    this.casovnik = new Casovnik();
    this.zvukMotora = new Zvuk($.root + "zvuci/engine.mp3");
    this.meci = [];
    this.trenutniMetak = 0;
    this.brzina = 0;
    this.ugao = $.TAU * 3/ 4;
    this.polozaj(scena.sirina / 2, scena.visina - this.visina);
    this.praviMetke();
    this.granicnik = $.OGRANICI;
  }

  update() {
    super.update();
    this.proveriTipke();
    this.azurirajMetke();
  }

  nagore() {
    super.nagore();
    this.zvukMotora.play();
  }

  puca() {
    let protekloVreme = this.casovnik.dajProtekleSekunde();
    let cevNijeSpremna = protekloVreme <= PAUZA_PALJBE;
    let nemaMunicije = this.trenutniMetak >= BROJ_METAKA - 2;
    if (cevNijeSpremna || nemaMunicije) return;

    this.meci[this.trenutniMetak].puca(0);
    this.meci[this.trenutniMetak + 1].puca(-SIRINA_PALJBE);
    this.meci[this.trenutniMetak + 2].puca(SIRINA_PALJBE);
    this.trenutniMetak += 3;
    this.casovnik.reset();
  }

  praviMetke() {
    for (let i = 0; i < BROJ_METAKA; i++) {
      this.meci[i] = new Metak(this.scena, this);
    }
  }

  azurirajMetke() {
    for (let i = 0; i < BROJ_METAKA; i++) {
      this.meci[i].update();
    }
  }

  preostaloMetaka() {
    return BROJ_METAKA - this.trenutniMetak;
  }

} // Avionce
