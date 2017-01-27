export class Vreme {

  constructor() {
    this.upamcenoVreme = Date.now()
    this.prosloUpamcenoVreme = 0
  }

  start() {
    this.upamcenoVreme = Date.now()
  }

  dajTrenutnoVreme() {
    return Date.now()
  }

  dajProtekleSekunde() {
    return (this.dajTrenutnoVreme() - this.upamcenoVreme) / 1000
  }

  dajProtekleMilisekunde() {
    return this.dajTrenutnoVreme() - this.upamcenoVreme
  }

  dajVremenskiRazmak () {
    this.prosloUpamcenoVreme = this.upamcenoVreme
    this.upamcenoVreme = Date.now()
    return (this.upamcenoVreme - this.prosloUpamcenoVreme)
  }

  // alias
  reset() {
    this.start()
  }

}
