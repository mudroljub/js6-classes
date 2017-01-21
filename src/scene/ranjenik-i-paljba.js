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

const scena = new Scena(update);
const pozadina = new Pozadina(scena, $.root + "slike/teksture/beton.gif");
const ranjenik = new Ranjenik(scena);
const casovnik = new Casovnik();
// const tabela = document.getElementById("tabela");

function update() {
  scena.cisti();
  pozadina.update();
  azurirajVreme()
  // prikaziRezultat();
  pali();
  for (let i = 0; i < plotuni.length; i++) {
    plotuni[i].update();
  }
  ranjenik.update();
}

/*** FUNKCIJE ***/

function pali() {
  if (protekleMilisekunde < pocetakPaljbe || ovajPlotun >= BROJ_PLOTUNA) return;
  plotuni[ovajPlotun] = new Paljba(scena);
  if (ranjenik.sudara(plotuni[ovajPlotun])) ranjenik.pogodjen += 1;
  pocetakPaljbe += RITAM_PALJBE;
  ovajPlotun++;
}

function prikaziRezultat() {
  tabela.innerHTML = `Pogoci: ${ranjenik.pogodjen}. Vreme: ${Math.floor(protekloVreme)}`;
}

function azurirajVreme() {
  protekleMilisekunde = casovnik.dajProtekleMilisekunde();
  protekloVreme = casovnik.dajProtekleSekunde();
  if (protekloVreme > ZADATO_VREME) {
    scena.stop();
    // javi game over
  }
}

/*** EXPORT ***/

export default scena
