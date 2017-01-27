import * as $ from '../konstante';
import {Igrac} from '../core/Igrac';
import {Zvuk} from '../core/Zvuk';
import {Vreme} from '../core/Vreme';
import {Metak} from '../2d-odozgo/Metak';
import platno from '../io/platno'
import {ogranici} from '../akcije/proveriGranice'

const BROJ_METAKA = 999;
const SIRINA_PALJBE = 13;
const PAUZA_PALJBE = 0.1;

export class Avionce extends Igrac {

  constructor() {
    super($.root + "slike/2d-odozgo/avionce.gif");
    this.prevelicaj(0.75);
    this.vreme = new Vreme();
    this.zvukMotora = new Zvuk($.root + "zvuci/engine.mp3");
    this.meci = [];
    this.trenutniMetak = 0;
    this.brzina = 0;
    this.ugao = $.KRUZNICA * 3/ 4;
    this.polozaj(platno.width / 2, platno.height - this.visina);
    this.praviMetke();
    this.granicnik = ogranici
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
    let protekloVreme = this.vreme.dajProtekleSekunde();
    let cevNijeSpremna = protekloVreme <= PAUZA_PALJBE;
    let nemaMunicije = this.trenutniMetak >= BROJ_METAKA - 2;
    if (cevNijeSpremna || nemaMunicije) return;

    this.meci[this.trenutniMetak].puca(0);
    this.meci[this.trenutniMetak + 1].puca(-SIRINA_PALJBE);
    this.meci[this.trenutniMetak + 2].puca(SIRINA_PALJBE);
    this.trenutniMetak += 3;
    this.vreme.reset();
  }

  praviMetke() {
    for (let i = 0; i < BROJ_METAKA; i++) {
      this.meci[i] = new Metak(this);
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
