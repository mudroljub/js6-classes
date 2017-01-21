import * as _ from '../funkcije';
import {mish} from '../io/mish';
import {Slika} from './Slika';
import {proveriGranice} from '../akcije/proveriGranice';

export class Predmet extends Slika {

  constructor (scena, src, sirina, visina, x = 200, y = 200) {
    super(src, sirina, visina);
    this.scena = scena;
    scena.dodaj(this);
    this.platno = scena.platno;
    this.x = x;
    this.y = y;
    this.ziv = true;
    this.vidljiv = true;
    this.ugao = 0;
    this.brzina = 0;
    this.skalarX = 1;
    this.skalarY = 1;
    this.oznake = {};
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.proveriGranice();
    this.crta();
  }

  /* POLOZAJ */

  set x(x) {
    this._x = x;
  }

  get x() {
    return this._x;
  }

  set y(y) {
    this._y = y;
  }

  get y() {
    return this._y;
  }

  tlo(y) {
    this.y = y - this.visina / 2;
  }

  polozaj(x, y) {
    this.x = x;
    this.y = y;
  }

  /* POLOZAJ RANDOM */

  postaviRandom() {
    this.polozaj(Math.random() * this.scena.sirina, Math.random() * this.scena.visina);
  }

  postaviRandomUredno() { // ne viri sa platna
    this.randomX();
    this.randomY();
  }

  randomX(pocetnoX = this.sirina/2, zavrsnoX = this.scena.sirina - this.sirina/2) {
    this.x = _.randomRange(pocetnoX, zavrsnoX);
  }

  randomY(pocetnoY = this.visina/2, zavrsnoY = this.scena.visina - this.visina/2) {
    this.y = _.randomRange(pocetnoY, zavrsnoY);
  }

  /* KRETANJE */

  get dx() {
    return this._dx;
  }

  set dx(dx) {
    this._dx = dx;
  }

  get dy() {
    return this._dy;
  }

  set dy(dy) {
    this._dy = dy;
  }

  predjiRastojanje(razmak) {
    this.x += razmak * Math.cos(this.ugao);
    this.y += razmak * Math.sin(this.ugao);
  }

  // mozda obrnuti redosled argumenata, ugao = 0 opcioni
  dodajSilu(ugao, potisak) {
    this.dx += potisak * Math.cos(ugao);
    this.dy += potisak * Math.sin(ugao);
  }

  get brzina() {
    return Math.sqrt((this.dx * this.dx) + (this.dy * this.dy));
  }

  set brzina(brzina) {
    this.dx = Math.cos(this.ugao) * brzina;
    this.dy = Math.sin(this.ugao) * brzina;
  }

  stani() {
    this.brzina = 0;
  }

  /* UGLOVI */

  get ugao() {
    return this._ugao;
  }

  set ugao(ugao) {
    this._ugao = ugao % (Math.PI * 2);
  }

  dajUgaoKa(predmet) {
    let mojX = this.x + (this.sirina / 2);
    let mojY = this.y + (this.visina / 2);
    let tudjiX = predmet.x + (predmet.sirina / 2);
    let tudjiY = predmet.y + (predmet.visina / 2);
    let razlikaX = tudjiX - mojX;
    let razlikaY = tudjiY - mojY;
    return Math.atan2(razlikaY, razlikaX);
  }

  /* VIDLJIVOST */

  get vidljiv() {
    return this._vidljiv;
  }

  set vidljiv(stanje) {
    this._vidljiv = stanje;
  }

  pokazi() {
    this.vidljiv = true;
  }

  sakrij() {
    this.vidljiv = false;
  }

  nestani() {
    this.sakrij();
    this.stani();
  }

  /* STANJE */

  get ziv() {
    return this._ziv;
  }

  set ziv(stanje) {
    this._ziv = stanje;
  }

  get mrtav() {
    return !this.ziv;
  }

  umri() {
    this.stani();
    this.zameniSliku(this.slikaMrtav);
    this.ziv = false;
  }

  /* GRANICE */

  get naEkranu() {
    return (this.x >= 0 && this.x <= this.scena.sirina) && (this.y >= 0 && this.y <= this.scena.visina);
  }

  izasaoLevo() {
    return this.x < -this.sirina / 2;
  }

  vracaVodoravno (procenatVracanja = 1) {
    if (this.izasaoLevo() && Math.random() < procenatVracanja) this.x = this.scena.sirina + this.sirina / 2;
  }

  get granicnik() {
    return this._granicnik;
  }

  set granicnik(action) {
    this._granicnik = action;
  }

  proveriGranice(prekoracenje) {
    proveriGranice(this, prekoracenje);
  }

  /* KOLIZIJA */

  get levo() {
    return this.x - (this.sirina / 2);
  }

  get desno() {
    return this.x + (this.sirina / 2);
  }

  get gore() {
    return this.y - (this.visina / 2);
  }

  get dole() {
    return this.y + (this.visina / 2);
  }

  sudara(predmet) {
    if (!this.vidljiv || !predmet.vidljiv) return false;
    return !(this.dole < predmet.gore || this.gore > predmet.dole || this.desno < predmet.levo || this.levo > predmet.desno);
  }

  razmakDo(predmet) {
    let razlikaX = this.x - predmet.x;
    let razlikaY = this.y - predmet.y;
    return Math.sqrt((razlikaX * razlikaX) + (razlikaY * razlikaY));
  }

  /* MISH */

  jeMishIznad() {
    return mish.x > this.levo && mish.x < this.desno && mish.y > this.gore && mish.y < this.dole;
  }

  jeMishStisnutIznad() {
    let kliknuto = this.scena.touchable || mish.stisnut;
    if (kliknuto && this.jeMishIznad()) return true;
    return false;
  }

  pratiMisha() {
    this.x = mish.x - this.scena.platno.offsetLeft;
    this.y = mish.y - this.scena.platno.offsetTop;
  }

  /* RENDER */

  crta() {
    if (!this.vidljiv) return;
    let podloga = this.scena.podloga;
    podloga.save();
    podloga.translate(this.x, this.y);
    podloga.rotate(this.ugao);
    podloga.scale(this.skalarX, this.skalarY);
    podloga.drawImage(this.slika, -this.sirina / 2, -this.visina / 2, this.sirina, this.visina);
    podloga.restore();
  }

  /* DEBUG */

  log() {
    let x = this.x.toFixed();
    let y = this.y.toFixed();
    let dx = this.dx.toFixed(2);
    let dy = this.dy.toFixed(2);
    let brzina = this.brzina.toFixed(2);
    let ugao = this.ugao.toFixed(2);
    console.log(`x: ${x}, y: ${y}, dx: ${dx}, dy: ${dy}, brzina: ${brzina}, ugao: ${ugao}, ziv: ${this.ziv}`);
  }

} // Predmet
