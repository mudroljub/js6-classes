import * as $ from '../konstante';
import {Scena} from '../core/Scena';
import {Casovnik} from '../core/Casovnik';
import {Ranjenik} from '../2d-odozgo/Ranjenik';
import {Pozadina} from '../core/Pozadina';
import {Paljba} from '../2d-odozgo/Paljba';

/*** KONFIG ***/

let scena;
let pozadina;
let ranjenik;
let tabela;
let casovnik;
let plotuni = [];
let ovajPlotun = 0;
let protekloVreme = 0;
let protekleMilisekunde = 0;
let pocetakPaljbe = 500;
const BROJ_PLOTUNA = 15;
const RITAM_PALJBE = 1500;
const ZADATO_VREME = 60;


/*** LOGIKA IGRE ***/

window.onload = init;

function init() {
  scena = new Scena(update);
  pozadina = new Pozadina(scena, $.root + "slike/teksture/beton.gif");
  ranjenik = new Ranjenik(scena);
  casovnik = new Casovnik();
  tabela = document.getElementById("tabela");
  scena.start();
} // scenu

function update() {
  scena.cisti();
  pozadina.update();
  azurirajVreme()
  prikaziRezultat();
  pali();
  for (let i = 0; i < plotuni.length; i++) {
    plotuni[i].update();
  }
  ranjenik.update();
} // update();


/*** POMOCNE FUNKCIJE ***/

function pali() {
  if (protekleMilisekunde < pocetakPaljbe || ovajPlotun >= BROJ_PLOTUNA) return;
  plotuni[ovajPlotun] = new Paljba(scena);
  if (ranjenik.sudara(plotuni[ovajPlotun])) ranjenik.pogodjen += 1;
  pocetakPaljbe += RITAM_PALJBE;
  ovajPlotun++;
} // pali

function prikaziRezultat() {
  tabela.innerHTML = `Pogoci: ${ranjenik.pogodjen}. Vreme: ${Math.floor(protekloVreme)}`;
} // prikaziRezultat

function azurirajVreme() {
  protekleMilisekunde = casovnik.dajProtekleMilisekunde();
  protekloVreme = casovnik.dajProtekleSekunde();
  if (protekloVreme > ZADATO_VREME) {
    scena.stop();
    // kazi game over
  } // if
} // azurirajVreme


/*** EXPORT ***/

export {scena}
