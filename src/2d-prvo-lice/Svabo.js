import * as $ from '../konstante';
import {Predmet} from '../core/Predmet';
import {Casovnik} from '../core/Casovnik';

const VREME_NISANJENJA = 3;

export class Svabo extends Predmet {

  constructor (scena, sirina = 100, visina = 150, PROCENAT_POJAVLJIVANJA = 0.003) {
    super (scena, $.root + "slike/2d-prvo-lice/rov-prazan.gif", sirina, visina);
    this.stoji = false;
    this.slikaGore = $.root + "slike/2d-prvo-lice/nemac-rov.gif";
    this.slikaDole = $.root + "slike/2d-prvo-lice/rov-prazan.gif";
    this.PROCENAT_POJAVLJIVANJA = PROCENAT_POJAVLJIVANJA;
    this.VREME_NISANJENJA = VREME_NISANJENJA; //koliko sekundi stoji pre nego zapuca
    this.casovnik = new Casovnik();
  } // constructor

  update() {
    super.update();
    this.povremenoUstaje();
  }

  povremenoUstaje() {
    if (!this.stoji && Math.random() < this.PROCENAT_POJAVLJIVANJA) this.ustani(true);
 } // povremenoUstaje

  ustani(stanje) {
    this.stoji = stanje;
    let slika = stanje ? this.slikaGore : this.slikaDole;
    this.zameniSliku(slika);
    if (stanje) this.casovnik.reset(); // startuje tajmer
  } // ustani

  jePogodjen() {
    if (this.stoji && this.jeMishIznad()) {
      this.ustani(false);
      return true;
    } // if
  } // jePogodjen

  jePucao() {
    if (!this.stoji) return false;
    let duzinaOstanka = this.casovnik.dajProtekleSekunde();
    if (duzinaOstanka <= this.VREME_NISANJENJA / 2) return false;
    this.slika.src = $.root + "slike/2d-prvo-lice/nemac-rov-puca.gif";
    if (duzinaOstanka > this.VREME_NISANJENJA) return true;
  } // jePucao

} // Svabo
