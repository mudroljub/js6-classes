import * as $ from '../konstante';
import tipke from '../io/tipke';
import {platno, podloga} from '../io/platno'
import Slika from '../core/Slika';

const MIN_UGAO = 0;
const MAX_UGAO = 65;
const MIN_BRZINA = 20;

export class Top {

  constructor(x = platno.width / 8, y = platno.height / 2) {
    this.x = x;
    this.y = y;
    this.ugao = 20;
    this.brzina = 30;
    this.postolje = new Slika($.root + 'slike/2d-bocno/top-postolje.gif');
    this.cev = {};
    this.postaviCev();
    this.projektil = {};
  }

  update() {
    this.proveriTipke();
    this.azuriraProjektil();
    this.crtaProjektil();
    this.crtaCev();
    this.crtaPostolje();
  }

  postaviCev() {
    this.cev = new Slika($.root + 'slike/2d-bocno/top-cev.gif');
    this.cev.x = this.x + (this.cev.slika.width / 2);
    this.cev.y = this.y;
  }

  puni() {
    this.projektil.ispaljen = false;
  }

  puca() {
    this.projektil.ispaljen = true;
  }

  /* PROJEKTIL */

  azuriraProjektil() {
    if (!this.projektil.ispaljen) this.pozicioniraProjektil();
    if (this.projektil.ispaljen) this.letiProjektil();
    let jeVanEkrana = this.projektil.x > platno.width || this.projektil.y > platno.height;
    if (jeVanEkrana) this.puni();
  }

  pozicioniraProjektil() {
    let centarCeviX = this.cev.x + this.cev.sirina / 4;
    let centarCeviY = this.cev.y + this.cev.visina * 0.71;
    let dijagonalaCevi = this.cev.sirina * 3/4;
    this.projektil.x = centarCeviX + dijagonalaCevi * Math.cos(this.ugao * Math.PI / 180);
    this.projektil.y = centarCeviY - dijagonalaCevi * Math.sin(this.ugao * Math.PI / 180);
  }

  letiProjektil() {
    this.projektil.x += this.brzina * Math.cos(this.ugao * Math.PI / 180);
    this.projektil.y -= this.brzina * Math.sin(this.ugao * Math.PI / 180);
  }

  /* UNOS */

  proveriTipke() {
    if(tipke.stisnute[$.RAZMAK]) {
      this.puca();
      return;
    }
    if(tipke.stisnute[$.LEVO] && !this.projektil.ispaljen) this.brzina--;
    if(tipke.stisnute[$.DESNO] && !this.projektil.ispaljen) this.brzina++;
    if(this.brzina <= MIN_BRZINA) this.brzina = MIN_BRZINA;
    if(tipke.stisnute[$.GORE]) this.ugao += 0.5;
    if(tipke.stisnute[$.DOLE]) this.ugao -= 0.5;
    if(this.ugao >= MAX_UGAO) this.ugao = MAX_UGAO;
    if(this.ugao <= MIN_UGAO) this.ugao = MIN_UGAO;
  }

  /* RENDER */

  crtaPostolje() {
    podloga.drawImage(this.postolje.slika, this.x, this.y);
  }

  crtaCev(){
    podloga.save();
    podloga.translate(this.cev.x + this.cev.sirina / 4, this.cev.y + this.cev.visina / 2);
    podloga.rotate(-this.ugao * Math.PI / 180);
    podloga.drawImage(this.cev.slika, -this.cev.sirina / 4, -this.cev.visina / 2);
    podloga.restore();
  }

  crtaProjektil() {
    podloga.fillStyle = "black";
    podloga.beginPath();
    podloga.arc(this.projektil.x, this.projektil.y, 5, 0, Math.PI * 2);
    podloga.fill();
  }
}
