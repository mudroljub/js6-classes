import {platno, podloga} from '../io/platno'

export class Scena {

  constructor() {
    this.predmeti = []
    this.nivoTla = this.visina
    this.loopID = null
  }

  dodaj(...premeti) {
    this.predmeti.push(...premeti)
  }

  /* VELIČINA */

  set sirina(sirina) {
    platno.width = sirina
  }

  get sirina() {
    return platno.width
  }

  set visina(visina) {
    platno.height = visina
  }

  get visina() {
    return platno.height
  }

  velicina(sirina, visina) {
    this.sirina = sirina
    this.visina = visina
  }

  /* PETLJA */

  update() {
    this.predmeti.map(predmet => 'update' in predmet && predmet.update())
  }

  render() {
    this.predmeti.map(predmet => 'render' in predmet && predmet.render())
  }

  loop() {
    this.loopID = window.requestAnimationFrame(this.loop.bind(this))
    this.cisti()
    this.update()
    this.render()
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

  /* POZADINA */

  set bojaPozadine(boja) {
    // platno.style.backgroundColor = boja
    podloga.fillStyle = boja
  }

  get bojaPozadine() {
    return podloga.fillStyle
  }

  cisti() {
    podloga.clearRect(0, 0, this.sirina, this.visina)
  }

  /* CRTANJE (prebaciti na pozadinu) */

  crtaNebo(nivoTla, bojaNeba = 'blue', bojaNebaPreliv = 'lightblue', pocetakPreliva = 0) {
    podloga.fillStyle = bojaNeba
    if (bojaNebaPreliv) {
      let preliv = podloga.createLinearGradient(0, pocetakPreliva, 0, nivoTla)
      preliv.addColorStop(0, bojaNeba)
      preliv.addColorStop(1, bojaNebaPreliv)
      podloga.fillStyle = preliv
    }
    podloga.fillRect(0, 0, platno.width, nivoTla)
  }

  crtaZemlju(nivoTla, bojaZemlje = "#00b011") {
    podloga.fillStyle = bojaZemlje
    podloga.fillRect(0, nivoTla, platno.width, platno.height)
  }

  crtaNeboZemlju(nivoTla, bojaNeba = "lightblue", bojaZemlje = "green", bojaNebaPreliv = 'blue') {
    this.crtaNebo(nivoTla, bojaNeba, bojaNebaPreliv)
    this.crtaZemlju(nivoTla, bojaZemlje)
  }
}
