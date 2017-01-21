// prebaciti u dir funkcije

export function dajSliku(src) {
  let slika = new Image();
  slika.src = src;
  return slika;
}

export function uRadijane(ugao) {
  return ugao * Math.PI / 180;
}

export function uStepene(uRadijane) {
  return uRadijane * 180 / Math.PI;
}

export function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}
