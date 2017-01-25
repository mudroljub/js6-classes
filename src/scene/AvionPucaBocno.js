import * as $ from '../konstante';
import {tipke} from '../io/tipke';
import platno from '../io/platno';
import {Scena} from '../core/Scena';

import {AvionIgrac} from '../2d-bocno/AvionIgrac';
import {Hummel} from '../2d-bocno/Hummel';
import {Aerodrom} from '../2d-bocno/Aerodrom';
import {Ruina} from '../2d-bocno/Ruina';
import {Oblak} from '../2d-bocno/Oblak';
import {Zbun} from '../2d-bocno/Zbun';
import {Shuma} from '../2d-bocno/Shuma';

/*** KONFIG ***/

const nivoTla = platno.visina
const zbunovi = [];
const oblaci = [];
const shume = [];

const BROJ_OBLAKA = 3;
const BROJ_ZBUNOVA = 10;
const BROJ_SHUME = 10;
const PARALAX_1 = -5;
const PARALAX_2 = -3;
const PARALAX_3 = -1;
const PARALAX_4 = -0.5;
const POTISAK = 0.3;
const MIN_UBRZANOST = 7;
const MAX_UBRZANOST = 20;
const DIZAJ = 10;
const MAX_DIGNUTOST = 5555;

let ubrzanostScene = 0;
let dignutostScene = 0;

const vozilo = new Hummel(nivoTla);
const aerodrom = new Aerodrom(nivoTla);
const ruina = new Ruina(nivoTla);
ruina.x = -ruina.sirina;


export default class AvionPucaBocno extends Scena {
  constructor() {
    super()
    this.igrac = new AvionIgrac(this);
    // primeniti fabriku
    for (let i = 0; i < BROJ_OBLAKA; i++) oblaci[i] = new Oblak();
    for (let i = 0; i < BROJ_ZBUNOVA; i++) zbunovi[i] = new Zbun(); // zbunovi su na nebu
    for (let i = 0; i < BROJ_SHUME; i++) shume[i] = new Shuma();
    this.dodaj(this.igrac, vozilo, aerodrom, ruina, ...oblaci, ...zbunovi, ...shume)
    this.pocniParalax();
  }

  update(){
    super.update()
    this.proveriTipke()
    this.crtaNebo(this.nivoTla + dignutostScene, 'blue', 'lightblue', dignutostScene)
    azuriraNiz(shume, 1)
    aerodrom.update()
    aerodrom.vracaVodoravno(0.001)
    ruina.update()
    ruina.vracaVodoravno(0.01)
    this.igrac.update()
    azuriraNiz(oblaci, 1)
    vozilo.patroliraj()
    vozilo.update()
    azuriraNiz(zbunovi, 1)
    this.proveriTlo()
    this.proveriSmrt()
  }

  proveriTipke() {
    if (!this.igrac.ziv) return;
    if (tipke.stisnute[$.D] && ubrzanostScene < MAX_UBRZANOST) this.ubrzavaPredmete($.TAU/2, POTISAK);
    if (tipke.stisnute[$.A] && ubrzanostScene >= MIN_UBRZANOST) this.ubrzavaPredmete($.TAU/2, -POTISAK);
    if (tipke.stisnute[$.W] && dignutostScene - DIZAJ < MAX_DIGNUTOST) {
      if (this.igrac.y < this.visina * 3/4) this.dizePredmete(DIZAJ);
      if (ubrzanostScene === 0) this.pocniParalax(); // kada avion ponovo uzlece
    }
    if (tipke.stisnute[$.S] && dignutostScene - DIZAJ >= 0) {
      if (this.igrac.y > this.visina / 4) this.dizePredmete(-DIZAJ);
    }
  }

  pocniParalax() {
    zbunovi.map(zbun => zbun.dx = PARALAX_1);
    ruina.dx = PARALAX_2;
    aerodrom.dx = PARALAX_3;
    shume.map(shuma => shuma.dx = PARALAX_3);
    oblaci.map(oblak => oblak.dx = PARALAX_4);
  }

  zaustaviParalax() {
    this.sviOstali(predmet => {
      if (!("neprijatelj" in predmet.oznake)) predmet.dx *= 0.9;
    });
    ubrzanostScene = 0;
  }

  ubrzavaPredmete(ugao, ubrzanje) {
    this.sviOstali(predmet => predmet.dodajSilu(ugao, ubrzanje));
    ubrzanostScene += ubrzanje;
  }

  dizePredmete(pomeraj) {
    this.sviOstali(predmet => predmet.y += pomeraj);
    dignutostScene += pomeraj;
  }

  proveriSmrt() {
    this.sviOstali(predmet => {
      if (predmet.mrtav) predmet.dx = PARALAX_1 - ubrzanostScene;
    })
    if (this.igrac.mrtav && dignutostScene > 0) this.dizePredmete(-DIZAJ);
  }

  proveriTlo() {
    if (this.igrac.jePrizemljen() && dignutostScene === 0) this.zaustaviParalax();
  }

}

/*** FUNKCIJE ***/

function azuriraNiz(niz, broj) {
  for (let i = 0; i < niz.length; i++) {
    niz[i].update();
    niz[i].vracaVodoravno(broj);
  }
}
