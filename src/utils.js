import unidecode from 'unidecode'
import {dijagonalaPlatna} from './io/platno'

export function dajSliku(src) {
  const slika = new Image()
  slika.src = src
  return slika
}

export function uRadijane(ugao) {
  return ugao * Math.PI / 180
}

export function uStepene(uRadijane) {
  return uRadijane * 180 / Math.PI
}

export function randomRange(min, max) {
  return Math.random() * (max - min) + min
}

export function nasumicnoOkruglo(min, max) {
  return Math.floor(randomRange(min, max + 1))
}

export function toUrl(naziv) {
  return unidecode(naziv).replace(/\s+/g, '-').toLowerCase()
}

// vraca od 0 do 1 zavisno od razmaka dva predmeta, u odnosu na scenu
export function skaliranRazmak (predmet, predmet2) {
  const razmak = predmet.razmakDo(predmet2)
  return 1 - razmak / dijagonalaPlatna
}
