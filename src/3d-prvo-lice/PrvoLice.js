import * as $ from '../konstante'
import platno from '../io/platno'
import {tipke} from '../io/tipke'
import {Slika} from '../core/Slika.js';

let predjeno = 0;
export const BRZINA = 0.3;
const MRDANJE_PUSKE = 10;
const DALJINA_VIDA = $.MOBILNI ? 8 : 14;
const VELICINA_KRUZICA = 5;
const BOJA_KRUZICA = '#f00';
const BOJA_LAMPE = '#ff0';

export class PrvoLice {

  constructor(mapa, x, y, ugao = 0) {
    this.platno = platno;
    this.podloga = platno.podloga;
    this.x = x;
    this.y = y;
    this.ugao = ugao;
    this.mapa = mapa;
    this.oruzje = new Slika($.root + 'slike/2d-prvo-lice/mitraljez.png');
    this.pucanj = new Audio($.root + 'zvuci/rafal.mp3');
    this.drmanje = 0;
  }

  update() {
    this.proveriTipke();
  }

  hoda(razmak) {
    predjeno++;
    let dx = Math.cos(this.ugao) * razmak;
    let dy = Math.sin(this.ugao) * razmak;
    if (this.mapa.daj(this.x + dx, this.y) <= 0) this.x += dx;
    if (this.mapa.daj(this.x, this.y + dy) <= 0) this.y += dy;
  } // hoda

  puca() {
    this.pucanj.play();
    this.drmanje = Math.random();
  } // puca

  nePuca() {
    this.drmanje = 0;
  }

  crtaPlamen(x, y) {
    if (!this.drmanje) return;
    let plamen = new Slika($.root + 'slike/mali-plam.png', 300, 200);
    this.podloga.drawImage(plamen.slika, x, y);
  }

  okreni(brzina) {
    this.ugao = (this.ugao + brzina + $.KRUZNICA) % ($.KRUZNICA);
  }

  bacaZrak(ugao) {
    let self = this;
    let zrak = {
      x: this.x,
      y: this.y,
      visina: 0,
      daljina: 0
    };
    let sinus = Math.sin(this.ugao + ugao);
    let kosinus = Math.cos(this.ugao + ugao);
    return _rekurzivnoNadji(zrak);

    function _rekurzivnoNadji(zrak) {
      let zrakX = _dajZrak(sinus, kosinus, zrak.x, zrak.y);
      let zrakY = _dajZrak(kosinus, sinus, zrak.y, zrak.x, true);
      let naredniZrak = (zrakX.duzina < zrakY.duzina) ? _dajNaredni(zrakX, 1, 0, zrak.daljina, zrakX.y): _dajNaredni(zrakY, 0, 1, zrak.daljina, zrakY.x);
      if (naredniZrak.daljina > DALJINA_VIDA) return [zrak];
      return [zrak].concat(_rekurzivnoNadji(naredniZrak));
    }

    function _dajZrak(sinus, kosinus, x, y, obrnut) {
      if (kosinus === 0) return {duzina: Infinity};
      let dx = (kosinus > 0) ? Math.floor(x + 1) - x : Math.ceil(x - 1) - x;
      let dy = dx * (sinus / kosinus);
      return {
        x: obrnut ? y + dy : x + dx,
        y: obrnut ? x + dx : y + dy,
        duzina: dx * dx + dy * dy
      };
    }

    function _dajNaredni(zrak, shiftX, shiftY, daljina, offset) {
      let dx = (kosinus < 0) ? shiftX : 0;
      let dy = (sinus < 0) ? shiftY : 0;
      zrak.visina = self.mapa.daj(zrak.x - dx, zrak.y - dy);
      zrak.daljina = daljina + Math.sqrt(zrak.duzina);
      zrak.sencenje = shiftX ? (kosinus < 0 ? 2 : 0) : (sinus < 0 ? 2 : 1);
      zrak.offset = offset - Math.floor(offset);
      return zrak;
    }

  } // bacaZrak

  proveriTipke() {
    if (tipke.stisnute[$.LEVO]) this.okreni(-BRZINA/2);
    if (tipke.stisnute[$.DESNO]) this.okreni(BRZINA/2);
    if (tipke.stisnute[$.GORE]) this.hoda(BRZINA);
    if (tipke.stisnute[$.DOLE]) this.hoda(-BRZINA);
    if (tipke.stisnute[$.RAZMAK]) this.puca();
    if (!tipke.stisnute[$.RAZMAK]) this.nePuca();
  } // proveriTipke

  crtaPusku() {
    let skalar = (this.platno.width + this.platno.height) / 1200;
    let skaliranaSirina = this.oruzje.sirina * skalar;
    let skaliranaVisina = this.oruzje.visina * skalar;
    let odstupanjeX = (Math.sin(predjeno) * MRDANJE_PUSKE * 0.33) + MRDANJE_PUSKE * 0.33;
    let odstupanjeY = this.drmanje * (Math.cos(predjeno) * MRDANJE_PUSKE) + MRDANJE_PUSKE;
    let puskaX = this.platno.width / 2 - skaliranaSirina / 2 + odstupanjeX;
    let puskaY = this.platno.height - skaliranaVisina + odstupanjeY;
    // this.crtaPlamen(puskaX + skaliranaSirina/2.4, puskaY - skaliranaVisina/10);
    this.podloga.drawImage(this.oruzje.slika, puskaX, puskaY, skaliranaSirina, skaliranaVisina);
  } // crtaPusku

  crtaKruzic(velicinaPolja) {
    let x = Math.floor(this.x * velicinaPolja);
    let y = Math.floor(this.y * velicinaPolja);
    // crta kruzic
    this.podloga.fillStyle = BOJA_KRUZICA;
    this.podloga.beginPath();
    this.podloga.arc(x, y, VELICINA_KRUZICA, this.ugao, this.ugao + $.KRUZNICA);
    this.podloga.fill();
    // crta svetlo
    this.podloga.fillStyle = BOJA_LAMPE;
    this.podloga.beginPath();
    this.podloga.arc(x, y, VELICINA_KRUZICA, this.ugao + $.KRUZNICA, this.ugao + $.KRUZNICA);
    this.podloga.arc(x, y, VELICINA_KRUZICA * 3, this.ugao - 0.15 * Math.PI, this.ugao + 0.15 * Math.PI);
    this.podloga.fill();
  } // crtaKruzic

  crtaRadar(){
    this.mapa.crta();
    this.crtaKruzic(this.mapa.velicinaPolja);
  }

} // PrvoLice
