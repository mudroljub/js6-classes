import * as $ from '../konstante';
import {Scena} from '../core/Scena';
import {Casovnik} from '../core/Casovnik';
import {Ranjenik} from '../2d-odozgo/Ranjenik';
import {Pozadina} from '../core/Pozadina';
import {Paljba} from '../2d-odozgo/Paljba';

/*** KONFIG ***/

const BROJ_PLOTUNA = 15;
const RITAM_PALJBE = 1500;
const ZADATO_VREME = 60;
let plotuni = [];
let ovajPlotun = 0;
let protekloVreme = 0;
let protekleMilisekunde = 0;
let pocetakPaljbe = 500;

/*** INIT ***/

const pozadina = new Pozadina($.root + "slike/teksture/beton.gif");
const ranjenik = new Ranjenik();
const casovnik = new Casovnik();
// const tabela = document.getElementById("tabela");

/*** FUNKCIJE ***/

function pali() {
  if (protekleMilisekunde < pocetakPaljbe || ovajPlotun >= BROJ_PLOTUNA) return;
  plotuni[ovajPlotun] = new Paljba();
  if (ranjenik.sudara(plotuni[ovajPlotun])) ranjenik.pogodjen += 1;
  pocetakPaljbe += RITAM_PALJBE;
  ovajPlotun++;
}

function prikaziRezultat() {
  tabela.innerHTML = `Pogoci: ${ranjenik.pogodjen}. Vreme: ${Math.floor(protekloVreme)}`;
}

/*** EXPORT ***/

export default class RanjenikPaljba extends Scena {
  constructor() {
    super()
  }

  update() {
    this.cisti();
    pozadina.update();
    this.azurirajVreme()
    // prikaziRezultat();
    pali();
    for (let i = 0; i < plotuni.length; i++) {
      plotuni[i].update();
    }
    ranjenik.update();
  }

  azurirajVreme() {
    protekleMilisekunde = casovnik.dajProtekleMilisekunde();
    protekloVreme = casovnik.dajProtekleSekunde();
    if (protekloVreme > ZADATO_VREME) {
      this.stop();
      // javi game over
    }
  }
}
