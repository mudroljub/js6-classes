import platno from '../io/platno'
const podloga = platno.podloga

export class Scena {

  constructor() {
    this.platno = platno;
    this.touchable = 'createTouch' in document;
    this.predmeti = [];
    this.nivoTla = this.visina;
    this.loopID = null
  }

  dodaj(...premeti) {
    this.predmeti.push(...premeti);
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
    podloga.fillStyle = boja;
  }

  get bojaPozadine() {
    return podloga.fillStyle;
  }

  cisti() {
    podloga.clearRect(0, 0, this.sirina, this.visina);
  }

  crtaNebo(nivoTla = this.nivoTla, bojaNeba = 'blue', bojaNebaPreliv = 'lightblue', pocetakPreliva = 0) {
    this.bojaPozadine = bojaNeba;
    if (bojaNebaPreliv) {
      let preliv = podloga.createLinearGradient(0, pocetakPreliva, 0, nivoTla);
      preliv.addColorStop(0, bojaNeba);
      preliv.addColorStop(1, bojaNebaPreliv);
      this.bojaPozadine = preliv;
    }
    podloga.fillRect(0, 0, this.sirina, nivoTla);
  }

  crtaZemlju(nivoTla, bojaZemlje = "#00b011") {
    this.bojaPozadine = bojaZemlje;
    podloga.fillRect(0, nivoTla, this.sirina, this.visina);
  }

  crtaNeboZemlju(nivoTla, bojaNeba = "lightblue", bojaZemlje = "green", bojaNebaPreliv = 'blue') {
    this.crtaNebo(nivoTla, bojaNeba, bojaNebaPreliv)
    this.crtaZemlju(nivoTla, bojaZemlje)
  }

  /* GLAVNI LOOP */

  update() {
    this.predmeti.map(predmet => {
      predmet.update()
    })
  }

  loop() {
    this.loopID = window.requestAnimationFrame(this.loop.bind(this))
    this.cisti()
    this.update()
    // this.render()
  }

  start() {
    if (this.loopID) return
    this.loop()
  }

  stop() {
    if (!this.loopID) return
    window.cancelAnimationFrame(this.loopID)
    this.loopID = null
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
