import {tipke} from '../io/tipke';
import {mish} from '../io/mish';
import {Igrac} from '../core/Igrac';

export class Bombas extends Igrac {

  constructor(scena, slika, sirina, visina) {
    super(scena, slika, sirina, visina);
    this.tipke = tipke;
    this.mish = mish;
    this.potisak = 2.4;
    this.prohodnost = 0.7;
    this.polozaj(100, 100);
  }

  puca() {
    console.log('bacaBombu');
  }

  pratiMisha () {
    this.x = this.mish.x;
    this.y = this.mish.y;
  }

  reset () {
    this.polozaj(Math.random() * 800, Math.random() * 600);
    this.brzina = 0;
  }

}
