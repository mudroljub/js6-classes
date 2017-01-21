export class Kvadrat {

  constructor(scena, x, y, sirina, visina, boja) {
    this.podloga = scena.podloga;
    this.x = x;
    this.y = y;
    this.sirina = sirina;
    this.visina = visina;
    this.fillstyle = boja;
  }

  crta () {
    this.podloga.fillStyle = this.fillstyle;
    this.podloga.fillRect(this.x, this.y, this.sirina, this.visina);
  }

} // Kvadrat
