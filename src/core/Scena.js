import {
  platno
} from '../io/platno';

export class Scena {

  constructor(update) {
    this.loop = update;
    this.platno = platno;
    this.podloga = platno.podloga;
    this.touchable = 'createTouch' in document;
    this.predmeti = [];
    this.nivoTla = this.visina;
  }

  dodaj(premet) {
    this.predmeti.push(premet);
  }

  /* VELIČINA */

  set sirina(sirina) {
    this.platno.width = sirina;
  }

  get sirina() {
    return this.platno.width;
  }

  set visina(visina) {
    this.platno.height = visina;
  }

  get visina() {
    return this.platno.height;
  }

  velicina(sirina, visina) {
    this.sirina = sirina;
    this.visina = visina;
  }

  /* POZADINA */

  set bojaPozadine(boja) {
    this.platno.style.backgroundColor = boja;
    this.podloga.fillStyle = boja;
  }

  get bojaPozadine() {
    return this.podloga.fillStyle;
  }

  cisti() {
    this.podloga.clearRect(0, 0, this.sirina, this.visina);
  }

  crtaNebo(nivoTla = this.nivoTla, bojaNeba = 'blue', bojaNebaPreliv = 'lightblue', pocetakPreliva = 0) {
    this.bojaPozadine = bojaNeba;
    if (bojaNebaPreliv) {
      let preliv = this.podloga.createLinearGradient(0, pocetakPreliva, 0, nivoTla);
      preliv.addColorStop(0, bojaNeba);
      preliv.addColorStop(1, bojaNebaPreliv);
      this.bojaPozadine = preliv;
    }
    this.podloga.fillRect(0, 0, this.sirina, nivoTla);
  }

  crtaZemlju(nivoTla, bojaZemlje = "#00b011") {
    this.bojaPozadine = bojaZemlje;
    this.podloga.fillRect(0, nivoTla, this.sirina, this.visina);
  }

  crtaNeboZemlju(nivoTla, bojaNeba = "lightblue", bojaZemlje = "green", bojaNebaPreliv = 'blue') {
    this.crtaNebo(nivoTla, bojaNeba, bojaNebaPreliv)
    this.crtaZemlju(nivoTla, bojaZemlje)
  }

  /* GLAVNI LOOP */

  start() {
    // requestAnimationFrame(update);
    this.interval = setInterval(this.loop, 50);
  }

  stop() {
    clearInterval(this.interval);
  }

  /* PREDMETI SCENE */

  sviOstali(uradiNesto) {
    for (let predmet of this.predmeti) {
      if ("igrac" in predmet.oznake || "raketa" in predmet.oznake) continue;
      uradiNesto(predmet);
    }
  }

  /* MISH */

  sakrijKursor() {
    this.platno.style.cursor = "none";
  }

  pokaziKursor() {
    this.platno.style.cursor = "default";
  }

} // Scena
