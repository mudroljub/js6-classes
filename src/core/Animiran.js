import {Casovnik} from './Casovnik';
import {Predmet} from './Predmet';
import {podloga} from '../io/platno'

export class Animiran extends Predmet {

  constructor(src, imenaAnimacija, slikaPoAnimaciji) { // broj ili niz brojeva ako su nejednake
    super(src);
    this.animacije = [];
    this.tekucaAnimacija = 0;
    this.duzinaAnimacije = 1000;
    this.protekloAnimacije = 0;
    this.casovnik = new Casovnik();
    this.praviAnimacije(imenaAnimacija, slikaPoAnimaciji);
  }

  /* ANIMACIJA */

  praviAnimacije(imenaAnimacija, slikaPoAnimaciji) {
    let brojKolona = slikaPoAnimaciji.length ? Math.max( ...slikaPoAnimaciji) : slikaPoAnimaciji;
    let sirinaKadra = this.slika.naturalWidth / brojKolona;
    let visinaKadra = this.slika.naturalHeight / imenaAnimacija.length;
    for (let i = 0; i < imenaAnimacija.length; i++) {
      let brojKadrova = slikaPoAnimaciji[i] || slikaPoAnimaciji;
      this.animacije.push({
        ime: imenaAnimacija[i],
        brojKadrova: brojKadrova,
        pocetniKadar: i * brojKadrova,
        sirinaKadra: sirinaKadra,
        visinaKadra: visinaKadra,
        ponavlja: true
      });
    }
  }

  reset() {
    this.protekloAnimacije = 0;
    this.casovnik.reset();
  }

  postaviAnimaciju(ime) {
    this.reset();
    this.animacije.map((animacija, i) => {
      if (animacija.ime === ime) this.tekucaAnimacija = i;
    })
  }

  nePonavljaAnimaciju(ime) {
    this.animacije.map((animacija) => {
      if (animacija.ime === ime) animacija.ponavlja = false;
    })
  }

  set duzinaAnimacije(milisekundi) {
    this._duzinaAnimacije = milisekundi > 50 ? milisekundi : 50;
  }

  get duzinaAnimacije() {
    return this._duzinaAnimacije;
  }

  /* RENDER */

  crtaKadar() {
    let tekuca = this.animacije[this.tekucaAnimacija];
    let duzinaFrejma = this.casovnik.dajVremenskiRazmak();
    let nijeZavrsena = this.protekloAnimacije + duzinaFrejma < this.duzinaAnimacije;
    if (tekuca.ponavlja || nijeZavrsena) this.protekloAnimacije += duzinaFrejma;

    let duzinaKadra = this.duzinaAnimacije / tekuca.brojKadrova;
    let trenutniKadar = Math.floor((this.protekloAnimacije % this.duzinaAnimacije) / duzinaKadra);
    let trenutniRed = Math.floor((tekuca.pocetniKadar + trenutniKadar) / tekuca.brojKadrova);
    let trenutnaKolona = (tekuca.pocetniKadar + trenutniKadar) - (trenutniRed * Math.floor(tekuca.brojKadrova));
    let slikaX = trenutnaKolona * tekuca.sirinaKadra;
    let slikaY = trenutniRed * tekuca.visinaKadra;

    podloga.drawImage(this.slika, slikaX, slikaY, tekuca.sirinaKadra, tekuca.visinaKadra, 0 - (tekuca.sirinaKadra / 2), 0 - (tekuca.visinaKadra / 2), tekuca.sirinaKadra, tekuca.visinaKadra);
  }

  crta() {
    if (!this.vidljiv) return;
    podloga.save();
    podloga.translate(this.x, this.y);
    podloga.rotate(this._ugaoSlike);
    this.crtaKadar();
    podloga.restore();
  }

}
