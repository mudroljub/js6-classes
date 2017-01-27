// problem sto promena ugla vise ne znaci promenu pravca kretanja?

import * as $ from '../konstante'
import platno from '../io/platno'
import {Predmet} from '../core/Predmet'
import {Zvuk} from '../core/Zvuk'

let trenutnoVikanje = 0

export class Patrola extends Predmet {

  constructor(slikaIzvor = $.root + "slike/2d-odozgo/nemci-patrola.gif") {
    super(slikaIzvor, 71, 78)
    this.zvuk = new Zvuk($.root + "zvuci/halt.mp3")
    this.brzina = 10
    this.granice = $.KRUZI
    // this.postaviNasumicno()
  }

  zuji() {
    if (this.brzina <= 0) return
    var nasumicno = Math.random() * Math.PI/2 - Math.PI/4
    this.ugao += nasumicno
  }

  vikni(brojVikanja) {
    this.zvuk.play()
    trenutnoVikanje++
    this.zvuk.audio.onended = () => {
      if(trenutnoVikanje >= brojVikanja) return
      this.vikni(brojVikanja)
    }
  }

  stop() {
    this.brzina = 0
  }

  postaviNasumicno() {
    var randomX = Math.random() * platno.width
    var randomY = Math.random() * platno.height
    this.polozaj(randomX, randomY)
  }

}
