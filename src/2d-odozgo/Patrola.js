import * as $ from '../konstante';
import {Predmet} from '../core/Predmet';
import {Zvuk} from '../core/Zvuk';

let trenutnoVikanje = 0;

export class Patrola extends Predmet {

  constructor(scena, slikaIzvor = $.root + "slike/2d-odozgo/nemci-patrola.gif") {
    super(scena, slikaIzvor, 71, 78);
    this.zvuk = new Zvuk($.root + "zvuci/halt.mp3", $.root + "zvuci/halt.ogg");
    this.brzina = 10;
    this.granicnik = $.KRUZI;
    // this.postaviNasumicno();
  }

  zuji() {
    if (this.brzina <= 0) return;
    var nasumicno = (Math.random() * Math.PI/2) - Math.PI/4;
    this.ugao += nasumicno;
  }

  vikni(brojVikanja) {
    this.zvuk.play();
    trenutnoVikanje++;
    this.zvuk.audio.onended = () => {
      if(trenutnoVikanje >= brojVikanja) return;
      this.vikni(brojVikanja);
    };
  }

  stop() {
    this.brzina = 0;
  }

  postaviNasumicno() {
    var randomX = Math.random() * this.scena.sirina;
    var randomY = Math.random() * this.scena.visina;
    this.polozaj(randomX, randomY);
  }

} // Patrola
