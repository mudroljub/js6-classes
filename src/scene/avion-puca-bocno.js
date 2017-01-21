import * as $ from '../konstante';
import {tipke} from '../io/tipke';
import {Scena} from '../core/Scena';

import {AvionIgrac} from '../2d-bocno/AvionIgrac';
import {Hummel} from '../2d-bocno/Hummel';
import {Aerodrom} from '../2d-bocno/Aerodrom';
import {Ruina} from '../2d-bocno/Ruina';
import {Oblak} from '../2d-bocno/Oblak';
import {Zbun} from '../2d-bocno/Zbun';
import {Shuma} from '../2d-bocno/Shuma';

/*** KONFIG ***/

let zbunovi = [];
let oblaci = [];
let shume = [];
const BROJ_OBLAKA = 3;
const BROJ_ZBUNOVA = 10;
const BROJ_SHUME = 10;

const PARALAX_1 = -5;
const PARALAX_2 = -3;
const PARALAX_3 = -1;
const PARALAX_4 = -0.5;

let ubrzanostScene = 0;
const POTISAK = 0.3;
const MIN_UBRZANOST = 7;
const MAX_UBRZANOST = 20;

let dignutostScene = 0;
const DIZAJ = 10;
const MAX_DIGNUTOST = 5555;

/*** INIT ***/

var scena = new Scena(update);
var avion = new AvionIgrac(scena);
var vozilo = new Hummel(scena);
var aerodrom = new Aerodrom(scena);
let ruina = new Ruina(scena);

ruina.x = -ruina.sirina;
for (let i = 0; i < BROJ_OBLAKA; i++) oblaci[i] = new Oblak(scena);
for (let i = 0; i < BROJ_ZBUNOVA; i++) zbunovi[i] = new Zbun(scena);
for (let i = 0; i < BROJ_SHUME; i++) shume[i] = new Shuma(scena);
pocniParalax();

/*** FUNKCIJE ***/

function update() {
  proveriTipke();
  scena.crtaNebo(scena.nivoTla + dignutostScene, 'blue', 'lightblue', dignutostScene);
  azuriraNiz(shume, 1);
  aerodrom.update();
  aerodrom.vracaVodoravno(0.001);
  ruina.update();
  ruina.vracaVodoravno(0.01);
  avion.update();
  azuriraNiz(oblaci, 1);
  vozilo.patroliraj();
  vozilo.update();
  azuriraNiz(zbunovi, 1);
  proveriTlo();
  proveriSmrt();
}

function proveriTipke() {
  if (!avion.ziv) return;

  if (tipke.stisnute[$.D] && ubrzanostScene < MAX_UBRZANOST) ubrzavaPredmete($.TAU/2, POTISAK);
  if (tipke.stisnute[$.A] && ubrzanostScene >= MIN_UBRZANOST) ubrzavaPredmete($.TAU/2, -POTISAK);

  if (tipke.stisnute[$.W] && dignutostScene - DIZAJ < MAX_DIGNUTOST) {
    if (avion.y < scena.visina * 3/4) dizePredmete(DIZAJ);
    if (ubrzanostScene === 0) pocniParalax(); // kada avion ponovo uzlece
  }
  if (tipke.stisnute[$.S] && dignutostScene - DIZAJ >= 0) {
    if (avion.y > scena.visina / 4) dizePredmete(-DIZAJ);
  }
}

function pocniParalax() {
  zbunovi.map(zbun => zbun.dx = PARALAX_1);
  ruina.dx = PARALAX_2;
  aerodrom.dx = PARALAX_3;
  shume.map(shuma => shuma.dx = PARALAX_3);
  oblaci.map(oblak => oblak.dx = PARALAX_4);
}

function zaustaviParalax() {
  scena.sviOstali(predmet => {
    if (!("neprijatelj" in predmet.oznake)) predmet.dx *= 0.9;
  });
  ubrzanostScene = 0;
}

function azuriraNiz(niz, broj) {
  for (let i = 0; i < niz.length; i++) {
    niz[i].update();
    niz[i].vracaVodoravno(broj);
  }
}

function ubrzavaPredmete(ugao, ubrzanje) {
  scena.sviOstali(predmet => predmet.dodajSilu(ugao, ubrzanje));
  ubrzanostScene += ubrzanje;
}

function dizePredmete(pomeraj) {
  scena.sviOstali(predmet => predmet.y += pomeraj);
  dignutostScene += pomeraj;
}

function proveriSmrt() {
  scena.sviOstali(predmet => {
    if (predmet.mrtav) predmet.dx = PARALAX_1 - ubrzanostScene;
  })
  if (avion.mrtav && dignutostScene > 0) dizePredmete(-DIZAJ);
}

function proveriTlo() {
  if (avion.jePrizemljen() && dignutostScene === 0) zaustaviParalax();
}

/*** EXPORT ***/

export default scena
