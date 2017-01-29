// predmet crta posredi, kvadrat od gore levo!
// ubaciti sliku minobacača
// bodovi, mozda pogoci prema pokušajima, mozda dva igraca

import {root}from '../konstante'
import {Scena} from '../core/Scena'
import {Predmet} from '../core/Predmet'
import {Kvadrat} from '../core/Kvadrat'
import {Minobacac} from '../2d-bocno/Minobacac'

/*** KONFIG ***/

let brdo
let minobacac
let tlo

export default class MinobacacScena extends Scena {
  constructor() {
    super()
    this.init()
  }

  init() {
    brdo = new Predmet(root + "slike/brdo.jpg", 85, 280, 500, 50)
    minobacac = new Minobacac(10, 280, 200, 20)
    tlo = new Kvadrat(0, 300, 600, 30, "rgb(10,250,0)")
    this.start()
  }

  update() {
    this.cisti()
    brdo.crta()
    tlo.crta()
    minobacac.update()
    this.proveriPogodak()
  }

  proveriPogodak() {
    if (minobacac.projektil.sudara(brdo) || minobacac.projektil.sudara(tlo)) {
      // TODO: reset()
      this.stop()
    }
  }
}
