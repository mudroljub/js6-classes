import * as _ from '../funkcije'
import {platno, podloga} from '../io/platno'
import mish from '../io/mish'
import {Slika} from './Slika'
import {proveriGranice} from '../akcije/proveriGranice'

export class Predmet extends Slika {

  constructor (src, sirina, visina, x = 200, y = 200) {
    super(src, sirina, visina)
    this.x = x
    this.y = y
    this.ziv = true
    this.vidljiv = true
    this.ugao = 0
    this.brzina = 0
    this.skalarX = 1
    this.skalarY = 1
    this.oznake = {}
  }

  update() {
    this.x += this.dx
    this.y += this.dy
    this.proveriGranice()
    this.crta()
  }

  /* POLOZAJ */

  tlo(y) {
    this.y = y - this.visina / 2
  }

  polozaj(x, y) {
    this.x = x
    this.y = y
  }

  /* POLOZAJ RANDOM */

  postaviRandom() {
    this.polozaj(Math.random() * platno.width, Math.random() * platno.height)
  }

  postaviRandomUredno() { // ne viri sa platna
    this.randomX()
    this.randomY()
  }

  randomX(pocetnoX = this.sirina/2, zavrsnoX = platno.width - this.sirina/2) {
    this.x = _.randomRange(pocetnoX, zavrsnoX)
  }

  randomY(pocetnoY = this.visina/2, zavrsnoY = platno.height - this.visina/2) {
    this.y = _.randomRange(pocetnoY, zavrsnoY)
  }

  /* KRETANJE */

  azurirajSilu(ugao, jacina) {
    this.dx = Math.cos(ugao) * jacina
    this.dy = Math.sin(ugao) * jacina
  }

  // obrnuti redosled argumenata, ugao opcioni
  dodajSilu(ugao, jacina) {
    this.dx += Math.cos(ugao) * jacina
    this.dy += Math.sin(ugao) * jacina
  }

  get brzina() {
    return Math.sqrt(this.dx * this.dx + this.dy * this.dy)
  }

  set brzina(novaBrzina) {
    this.azurirajSilu(this.ugao, novaBrzina)
  }

  predjiRastojanje(razmak) {
    this.x += razmak * Math.cos(this.ugao)
    this.y += razmak * Math.sin(this.ugao)
  }

  stani() {
    this.brzina = 0
  }

  /* UGLOVI */

  get ugao() {
    return this._ugao
  }

  set ugao(noviUgao) {
    this._ugao = noviUgao % (Math.PI * 2)
    this.azurirajSilu(this.ugao, this.brzina)
  }

  dajUgaoKa(predmet) {
    const mojX = this.x + this.sirina / 2
    const mojY = this.y + this.visina / 2
    const tudjX = predmet.x + predmet.sirina / 2
    const tudjY = predmet.y + predmet.visina / 2
    return Math.atan2(tudjY - mojY, tudjX - mojX)
  }

  /* VIDLJIVOST */

  pokazi() {
    this.vidljiv = true
  }

  sakrij() {
    this.vidljiv = false
  }

  nestani() {
    this.sakrij()
    this.stani()
  }

  /* STANJE */

  get mrtav() {
    return !this.ziv
  }

  umri() {
    this.stani()
    this.zameniSliku(this.slikaMrtav)
    this.ziv = false
  }

  /* GRANICE */

  get naEkranu() {
    return (this.x >= 0 && this.x <= platno.width) && (this.y >= 0 && this.y <= platno.height)
  }

  izasaoLevo() {
    return this.x < -this.sirina / 2
  }

  get granicnik() {
    return this._granicnik
  }

  set granicnik(action) {
    this._granicnik = action
  }

  proveriGranice(prekoracenje) {
    proveriGranice(this, prekoracenje)
  }

  /* KOLIZIJA */

  get levo() {
    return this.x - (this.sirina / 2)
  }

  get desno() {
    return this.x + (this.sirina / 2)
  }

  get gore() {
    return this.y - (this.visina / 2)
  }

  get dole() {
    return this.y + (this.visina / 2)
  }

  sudara(predmet) {
    if (!this.vidljiv || !predmet.vidljiv) return false
    return !(this.dole < predmet.gore || this.gore > predmet.dole || this.desno < predmet.levo || this.levo > predmet.desno)
  }

  razmakDo(predmet) {
    let razlikaX = this.x - predmet.x
    let razlikaY = this.y - predmet.y
    return Math.sqrt((razlikaX * razlikaX) + (razlikaY * razlikaY))
  }

  /* MISH */

  jeMishIznad() {
    return mish.x > this.levo && mish.x < this.desno && mish.y > this.gore && mish.y < this.dole
  }

  jeMishStisnutIznad() {
    if (mish.stisnut && this.jeMishIznad()) return true
    return false
  }

  pratiMisha() {
    this.x = mish.x - platno.offsetLeft
    this.y = mish.y - platno.offsetTop
  }

  /* RENDER */

  crta() {
    if (!this.vidljiv) return
    podloga.save()
    podloga.translate(this.x, this.y)
    podloga.rotate(this.ugao)
    podloga.scale(this.skalarX, this.skalarY)
    podloga.drawImage(this.slika, -this.sirina / 2, -this.visina / 2, this.sirina, this.visina)
    podloga.restore()
  }

  /* DEBUG */

  log() {
    let x = this.x.toFixed()
    let y = this.y.toFixed()
    let dx = this.dx.toFixed(2)
    let dy = this.dy.toFixed(2)
    let brzina = this.brzina.toFixed(2)
    let ugao = this.ugao.toFixed(2)
    console.log(`x: ${x}, y: ${y}, dx: ${dx}, dy: ${dy}, brzina: ${brzina}, ugao: ${ugao}, ziv: ${this.ziv}`)
  }

}
