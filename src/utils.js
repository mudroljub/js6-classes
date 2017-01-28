import unidecode from 'unidecode'

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

export function toUrl(naziv) {
  return unidecode(naziv).replace(/\s+/g, '-').toLowerCase()
}
