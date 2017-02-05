import * as $ from '../konstante'
import {platno, podloga} from 'io/platno'
import Slika from 'core/Slika.js'

const BOJA_TLA = '#701206'
const BOJA_KISHE = '#ffffff'
const SENKA_ZIDA = '#000000'
const ZIZNA_DALJINA = 0.8
const PROCENAT_MUNJE = 0.04
const REZOLUCIJA = $.MOBILNI ? 160 : 320
const IGNORISE_VISINU = true
const KISHA_PADA = true

export class Panorama {
  constructor(prvoLice, nebo, ...teksture) {
    this.prvoLice = prvoLice
    this.nebo = new Slika(nebo)
    this.teksture = teksture.map((tekstura) => new Slika(tekstura))
    this.sirinaGrida = platno.width / REZOLUCIJA
    this.grom = new Audio($.root + 'zvuci/grom.mp3')
    this.dometSvetla = 5
    this.svetlo = 0
    this.pustiKishu()
    this.trebaTlo = true // da crta tlo
  }

  update() {
    this.azuriraMunje()
  }

  end() {
    this.zvukKishe.pause()
    this.grom.pause()
  }

  pustiKishu() {
    this.zvukKishe = new Audio($.root + 'zvuci/kisha.mp3')
    this.zvukKishe.loop = true
    this.zvukKishe.play()
  }

  azuriraMunje() {
    this.svetlo = Math.random() < PROCENAT_MUNJE ? (Math.random() * 2 + 1) : 0
    if (this.svetlo) this.grom.play()
  }

  crtaPozadinu() {
    this.crtaNebo()
    if (this.trebaTlo) this.crtaTlo()
  }

  crtaNebo() {
    let novaSirina = this.trebaTlo ? this.nebo.sirina : this.nebo.sirina * (platno.height / this.nebo.visina) * 2
    let novaVisina = this.trebaTlo ? platno.height / 2 : platno.height
    let x = -(this.prvoLice.ugao / $.KRUZNICA) * novaSirina
    podloga.save()
    podloga.drawImage(this.nebo.slika, x, 0, novaSirina, novaVisina)
    if (x < (novaSirina - platno.width)) {
      podloga.drawImage(this.nebo.slika, x + novaSirina, 0, novaSirina, novaVisina)
    }
    podloga.restore()
  }

  crtaTlo(boja = BOJA_TLA) {
    podloga.fillStyle = boja
    podloga.fillRect(0, platno.height/2, platno.width, platno.height)
  }

  crtaZidove() {
    podloga.save()
    for (let ovajGrid = 0; ovajGrid < REZOLUCIJA; ovajGrid++) {
      let x = ovajGrid / REZOLUCIJA - 0.5
      let ugao = Math.atan2(x, ZIZNA_DALJINA)
      let zrak = this.prvoLice.bacaZrak(ugao)
      this._crtaGrid(ovajGrid, zrak, ugao)
    }
    podloga.restore()
  }

  _crtaGrid(ovajGrid, zrak, ugao) {
    let levo = Math.floor(ovajGrid * this.sirinaGrida)
    let najblizi = 0
    while (najblizi < zrak.length && zrak[najblizi].visina <= 0) najblizi++
    for (let i = zrak.length - 1; i >= 0; i--) {
      if (i === najblizi) this._crtaZid(zrak[najblizi], ugao, levo)
      if (KISHA_PADA) this._crtaKishu(i, zrak[i], ugao, levo)
    }
  }

  render() {
    this.crtaPozadinu()
    this.crtaZidove()
  }

  /* POMOCNE FUNKCIJE */

  _crtaZid(ovoPolje, ugao, levo) {
    let tekstura = this.teksture[ovoPolje.visina - 1] || this.teksture[0]  // visina odredjuje teksturu
    let teksturaX = Math.floor(tekstura.sirina * ovoPolje.offset)
    let sirinaGrida = Math.ceil(this.sirinaGrida)
    let zid = this._racunaVisinu(ovoPolje.visina, ugao, ovoPolje.daljina)
    podloga.globalAlpha = 1
    podloga.drawImage(tekstura.slika, teksturaX, 0, 1, tekstura.visina, levo, zid.gore, sirinaGrida, zid.visina)
    podloga.fillStyle = SENKA_ZIDA
    podloga.globalAlpha = Math.max((ovoPolje.daljina + ovoPolje.sencenje) / this.dometSvetla - this.svetlo, 0)
    podloga.fillRect(levo, zid.gore, sirinaGrida, zid.visina)
  }

  _crtaKishu(i, ovoPolje, ugao, levo) {
    let kapiKishe = Math.pow(Math.random(), 3) * i
    let kisha = (kapiKishe > 0) && this._racunaVisinu(0.1, ugao, ovoPolje.daljina)
    podloga.fillStyle = BOJA_KISHE
    podloga.globalAlpha = 0.15
    while (--kapiKishe > 0) podloga.fillRect(levo, Math.random() * kisha.gore, 1, kisha.visina)
  }

  _racunaVisinu(visinaPolja, ugao, daljina) {
    if (IGNORISE_VISINU) visinaPolja = 1
    let z = daljina * Math.cos(ugao)
    let zidVisina = platno.height * visinaPolja / z
    let dole = platno.height / 2 * (1 + (1 / z))
    return {
      gore: dole - zidVisina,
      visina: zidVisina
    }
  }
}
