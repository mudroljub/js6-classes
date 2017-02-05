import {mapa} from '../mape/mapa-mala';
import {podloga} from 'io/platno'

const BOJE = ['#fff', '#444', '#701206', '#000'];

export default class Mapa {

  constructor(velicinaPolja = 30, polja = mapa) {
    this.polja = polja;
    this.velicinaPolja = velicinaPolja;
    this.visina = polja.length * velicinaPolja;
    this.sirina = polja[0].length * velicinaPolja;
  } // constructor

  praviNasumicno(velicinaMape) {
    const PROCENAT_ZIDA = 0.3;
    this.polja = [];
    for (let i = 0; i < velicinaMape; i++) {
      this.polja[i] = [];
      for (let j = 0; j < velicinaMape; j++) {
        this.polja[i][j] = Math.random() < PROCENAT_ZIDA ? 1 : 0;
      }
    }
  } // praviNasumicno

  daj(x, y) {
    x = Math.floor(x);
    y = Math.floor(y);
    if (x < 0 || x >= this.polja[0].length || y < 0 || y >= this.polja.length) return -1;
    return this.polja[y][x];
  } // daj

  nadjiPolje(x, y) {
    let poljeX = Math.floor(x / this.velicinaPolja);
    let poljeY = Math.floor(y / this.velicinaPolja);
    return { 'y': poljeY, 'x': poljeX };
  } // nadjiPolje

  crta() {
    for (var i = 0; i < this.polja.length; i++) {
        for (var j = 0; j < this.polja[i].length; j++) {
          let visina = this.polja[i][j];
          podloga.fillStyle = BOJE[visina];
          podloga.fillRect(j * this.velicinaPolja, i * this.velicinaPolja, this.velicinaPolja, this.velicinaPolja);
        }
    }
  } // crta

} // Mapa
