import * as $ from 'konstante'
import {platno, podloga} from 'io/platno'
import tipke from 'io/tipke'
import Slika from 'core/Slika.js'
import slikaMitraljez from 'slike/2d-prvo-lice/mitraljez.png'
import slikaPlam from 'slike/mali-plam.png'

let predjeno = 0
export const BRZINA = 0.3
const MRDANJE_PUSKE = 10
const DALJINA_VIDA = $.MOBILNI ? 8 : 14
const VELICINA_KRUZICA = 5
const BOJA_KRUZICA = '#f00'
const BOJA_LAMPE = '#ff0'

export class PrvoLice {

  constructor(mapa, x, y, ugao = 0) {
    this.x = x
    this.y = y
    this.ugao = ugao
    this.mapa = mapa
    this.oruzje = new Slika(slikaMitraljez)
    this.pucanj = new Audio(__dirname + 'zvuci/rafal.mp3')
    this.drmanje = 0
  }

  update() {
    this.proveriTipke()
  }

  end() {
    this.pucanj.pause()
  }

  hoda(razmak) {
    predjeno++
    const dx = Math.cos(this.ugao) * razmak
    const dy = Math.sin(this.ugao) * razmak
    if (this.mapa.daj(this.x + dx, this.y) <= 0) this.x += dx
    if (this.mapa.daj(this.x, this.y + dy) <= 0) this.y += dy
  } // hoda

  puca() {
    this.pucanj.play()
    this.drmanje = Math.random()
  } // puca

  nePuca() {
    this.drmanje = 0
  }

  crtaPlamen(x, y) {
    if (!this.drmanje) return
    const plamen = new Slika(slikaPlam, 300, 200)
    podloga.drawImage(plamen.slika, x, y)
  }

  okreni(brzina) {
    this.ugao = (this.ugao + brzina + $.KRUZNICA) % ($.KRUZNICA)
  }

  bacaZrak(ugao) {
    const self = this
    const zrak = {
      x: this.x,
      y: this.y,
      visina: 0,
      daljina: 0
    }
    const sinus = Math.sin(this.ugao + ugao)
    const kosinus = Math.cos(this.ugao + ugao)
    return _rekurzivnoNadji(zrak)

    function _dajZrak(sinus, kosinus, x, y, obrnut) {
      if (kosinus === 0) return {duzina: Infinity}
      const dx = (kosinus > 0) ? Math.floor(x + 1) - x : Math.ceil(x - 1) - x
      const dy = dx * (sinus / kosinus)
      return {
        x: obrnut ? y + dy : x + dx,
        y: obrnut ? x + dx : y + dy,
        duzina: dx * dx + dy * dy
      }
    }

    function _rekurzivnoNadji(zrak) {
      const zrakX = _dajZrak(sinus, kosinus, zrak.x, zrak.y)
      const zrakY = _dajZrak(kosinus, sinus, zrak.y, zrak.x, true)
      const naredniZrak = (zrakX.duzina < zrakY.duzina) ? _dajNaredni(zrakX, 1, 0, zrak.daljina, zrakX.y): _dajNaredni(zrakY, 0, 1, zrak.daljina, zrakY.x)
      if (naredniZrak.daljina > DALJINA_VIDA) return [zrak]
      return [zrak].concat(_rekurzivnoNadji(naredniZrak))
    }

    function _dajNaredni(zrak, shiftX, shiftY, daljina, offset) {
      const dx = (kosinus < 0) ? shiftX : 0
      const dy = (sinus < 0) ? shiftY : 0
      zrak.visina = self.mapa.daj(zrak.x - dx, zrak.y - dy)
      zrak.daljina = daljina + Math.sqrt(zrak.duzina)
      zrak.sencenje = shiftX ? (kosinus < 0 ? 2 : 0) : (sinus < 0 ? 2 : 1)
      zrak.offset = offset - Math.floor(offset)
      return zrak
    }

  } // bacaZrak

  proveriTipke() {
    if (tipke.stisnute[$.LEVO]) this.okreni(-BRZINA/2)
    if (tipke.stisnute[$.DESNO]) this.okreni(BRZINA/2)
    if (tipke.stisnute[$.GORE]) this.hoda(BRZINA)
    if (tipke.stisnute[$.DOLE]) this.hoda(-BRZINA)
    if (tipke.stisnute[$.RAZMAK]) this.puca()
    if (!tipke.stisnute[$.RAZMAK]) this.nePuca()
  } // proveriTipke

  crtaPusku() {
    const skalar = (platno.width + platno.height) / 1200
    const skaliranaSirina = this.oruzje.sirina * skalar
    const skaliranaVisina = this.oruzje.visina * skalar
    const odstupanjeX = (Math.sin(predjeno) * MRDANJE_PUSKE * 0.33) + MRDANJE_PUSKE * 0.33
    const odstupanjeY = this.drmanje * (Math.cos(predjeno) * MRDANJE_PUSKE) + MRDANJE_PUSKE
    const puskaX = platno.width / 2 - skaliranaSirina / 2 + odstupanjeX
    const puskaY = platno.height - skaliranaVisina + odstupanjeY
    // this.crtaPlamen(puskaX + skaliranaSirina/2.4, puskaY - skaliranaVisina/10)
    podloga.drawImage(this.oruzje.slika, puskaX, puskaY, skaliranaSirina, skaliranaVisina)
  } // crtaPusku

  crtaKruzic(velicinaPolja) {
    const x = Math.floor(this.x * velicinaPolja)
    const y = Math.floor(this.y * velicinaPolja)
    // crta kruzic
    podloga.fillStyle = BOJA_KRUZICA
    podloga.beginPath()
    podloga.arc(x, y, VELICINA_KRUZICA, this.ugao, this.ugao + $.KRUZNICA)
    podloga.fill()
    // crta svetlo
    podloga.fillStyle = BOJA_LAMPE
    podloga.beginPath()
    podloga.arc(x, y, VELICINA_KRUZICA, this.ugao + $.KRUZNICA, this.ugao + $.KRUZNICA)
    podloga.arc(x, y, VELICINA_KRUZICA * 3, this.ugao - 0.15 * Math.PI, this.ugao + 0.15 * Math.PI)
    podloga.fill()
  }

  crtaRadar() {
    this.mapa.crta()
    this.crtaKruzic(this.mapa.velicinaPolja)
  }

  render() {
    this.crtaPusku()
    this.crtaRadar()
  }

}
