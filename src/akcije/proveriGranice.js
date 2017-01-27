import platno from '../io/platno'

/* POMOCNE FUNKCIJE */

const izasaoDole = predmet => predmet.y > platno.height
const izasaoGore = predmet => predmet.y < 0
const izasaoDesno = predmet => predmet.x > platno.width
const izasaoLevo = predmet => predmet.x < 0
const izasaoLevoSkroz = predmet => predmet.x < -predmet.sirina / 2
const izasaoDesnoSkroz = predmet => predmet.x > platno.width + predmet.sirina / 2
const izasaoIgde = predmet => izasaoLevo(predmet) || izasaoDesno(predmet) || izasaoGore(predmet) || izasaoDole(predmet)

/* GRANICNE FUNKCIJE */

export function kruzi(predmet, procenat = 1) {
  if (Math.random() > procenat) return
  if (izasaoLevoSkroz(predmet)) predmet.x = platno.width + predmet.sirina / 2
  if (izasaoDesnoSkroz(predmet)) predmet.x = 0
  if (izasaoDole(predmet)) predmet.y = 0
  if (izasaoGore(predmet)) predmet.y = platno.height
}

export function kruziSire(predmet) {
  const prekoracenje = platno.width
  if (predmet.x < -prekoracenje) predmet.x = platno.width + prekoracenje
}

export function vracaVodoravno (predmet, procenatVracanja) {
  const procenat = procenatVracanja || predmet.procenatVracanja
  if (izasaoLevoSkroz(predmet) && Math.random() < procenat) predmet.x = platno.width + predmet.sirina / 2
}

export function odbij(predmet) {
  if (izasaoGore(predmet) || izasaoDole(predmet)) predmet.ugao = 2 * Math.PI - predmet.ugao
  if (izasaoLevo(predmet) || izasaoDesno(predmet)) predmet.ugao = Math.PI - predmet.ugao
  if (izasaoIgde(predmet)) predmet.pomeri(5)
}

export function stani(predmet) {
  if (izasaoIgde(predmet)) predmet.brzina = 0
}

export function nestani(predmet) {
  if (izasaoIgde(predmet)) predmet.nestani()
}

export function ogranici(predmet) {
  const marginaLevo = predmet.sirina / 4
  const marginaDesno = platno.width - marginaLevo
  const marginaGore = predmet.visina / 2
  const marginaDole = platno.height - marginaGore
  if (predmet.x <= marginaLevo) predmet.x = marginaLevo
  if (predmet.x >= marginaDesno) predmet.x = marginaDesno
  if (predmet.y <= marginaGore) predmet.y = marginaGore
  if (predmet.y >= marginaDole) predmet.y = marginaDole
}

export function nastavi() {}
