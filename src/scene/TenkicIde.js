// namestiti kruzenje svih predmeta na platformi?
// tenkovi, bunkeri, vojnici...

/*** IMPORT ***/

import {UI} from '../core/UI';
import {Scena} from '../core/Scena';
import {TenkPartizanski} from '../2d-bocno/TenkPartizanski';
import {Zbun} from '../2d-bocno/Zbun';
import {Shuma} from '../2d-bocno/Shuma';
import {Planina} from '../2d-bocno/Planina';
import {Oblak} from '../2d-bocno/Oblak';
import platno from '../io/platno'

/*** KONFIG ***/

const BROJ_OBLAKA = 3;
const BROJ_ZBUNOVA = 10;
const PARALAX_1 = -5;
const zbunovi = [];
const oblaci = [];
const nivoTla = platno.visina - 100;

const tenk = new TenkPartizanski(nivoTla);
const planina = new Planina(nivoTla);
const shumarak = new Shuma();
const interfejs = new UI();

shumarak.dx = PARALAX_1;
planina.dx = PARALAX_1;

for (let i = 0; i < BROJ_ZBUNOVA; i++) {
  zbunovi[i] = new Zbun();
  zbunovi[i].dx = PARALAX_1;
}

for (let i = 0; i < BROJ_OBLAKA; i++) {
  oblaci[i] = new Oblak(150, 100);
  oblaci[i].dx = PARALAX_1;
}

export default class TenkicIde extends Scena {
  constructor() {
    super()
    this.nivoTla = nivoTla
    this.dodaj(tenk, planina, shumarak, ...zbunovi, ...oblaci)
  }

  update() {
    this.crtaNeboZemlju(nivoTla);
    planina.update();
    shumarak.update();
    shumarak.proveriGranice(platno.sirina / 2);
    planina.proveriGranice(platno.sirina + 200);
    azurirajOblake();
    tenk.update();
    azurirajZbunje();
    // interfejs.render(praviUI());
  }
}

/*** POMOĆNE FUNKCIJE ***/

function praviUI() {
  return `
    <div class="komande bg-poluprovidno komande1">
     <span class="bold">Tenk</span>
     <br> A - levo
     <br> D - desno
     <br> W - gore
     <br> S - dole
     <br> space - puca
   </div>
   <div class="komande bg-poluprovidno energija1">${tenk.energija}</div>
   <progress class="komande poluprovidno progres1" value="${tenk.energija}" max="100"></progress>
  `;
}

function azurirajZbunje() {
  for (let i = 0; i < zbunovi.length; i++) {
    zbunovi[i].update();
    zbunovi[i].proveriGranice(10);
  }
}

function azurirajOblake() {
  for (let i = 0; i < oblaci.length; i++) {
    oblaci[i].update();
    oblaci[i].proveriGranice();
  }
}
