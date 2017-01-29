import * as $ from '../konstante'
import {kruzi} from '../akcije/granice'
import {Predmet} from '../core/Predmet'
import {Zvuk} from '../core/Zvuk'

let brojac = 0

export class Patrola extends Predmet {

  constructor(slikaIzvor = $.root + "slike/2d-odozgo/nemci-patrola.gif") {
    super(slikaIzvor, 71, 78)
    this.zvuk = new Zvuk($.root + "zvuci/halt.mp3")
    this.brzina = 10
    this.granice = kruzi
  }

  zuji() {
    if (this.brzina <= 0) return
    var nasumicno = Math.random() * Math.PI/2 - Math.PI/4
    this.ugao += nasumicno
  }

  vikni(brojPuta) {
    this.zvuk.play()
    brojac++
    this.zvuk.audio.onended = () => {
      if(brojac >= brojPuta) return
      this.vikni(brojPuta)
    }
  }

  stop() {
    this.brzina = 0
  }
}
