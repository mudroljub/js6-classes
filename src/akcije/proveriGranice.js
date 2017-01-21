import * as $ from '../konstante';

// napraviti željenu akciju u nižim klasama
// npr. PozadinaPokretno ima svoj metod proveriGranice

export function proveriGranice(predmet, procenat = 1) {
  let izasaoDesno = (predmet.x > predmet.scena.sirina);
  let izasaoLevo = (predmet.x < 0);
  let izasaoDole = (predmet.y > predmet.scena.visina);
  let izasaoGore = (predmet.y < 0);
  let izasaoIgde = izasaoLevo || izasaoDesno || izasaoGore || izasaoDole;

  switch (predmet.granicnik) {
    case $.KRUZI:
      if (Math.random() > procenat) break;
      izasaoLevo = (predmet.x + predmet.sirina / 2 < 0);
      izasaoDesno = (predmet.x > predmet.scena.sirina + predmet.sirina / 2);
      if (izasaoLevo) predmet.x = predmet.scena.sirina + predmet.sirina / 2;
      if (izasaoDesno) predmet.x = 0;
      if (izasaoDole) predmet.y = 0;
      if (izasaoGore) predmet.y = predmet.scena.visina;
      break;
    case $.KRUZI_SHIRE:
      let prekoracenje = predmet.scena.sirina;
      if (predmet.x < -prekoracenje) predmet.x = predmet.scena.sirina + prekoracenje;
      break;
    case $.ODBIJA:
      if (izasaoGore || izasaoDole) predmet.ugao = 2 * Math.PI - predmet.ugao;
      if (izasaoLevo || izasaoDesno) predmet.ugao = Math.PI - predmet.ugao;
      if (izasaoIgde) predmet.predjiRastojanje(5);
      break;
    case $.STANI:
      if (izasaoIgde) predmet.brzina = 0;
      break;
    case $.NESTANI:
      if (izasaoIgde) predmet.nestani();
      break;
    case $.OGRANICI:
      let marginaLevo = predmet.sirina / 4;
      let marginaDesno = predmet.scena.sirina - marginaLevo;
      let marginaGore = predmet.visina / 2;
      let marginaDole = predmet.scena.visina - marginaGore;
      if (predmet.x <= marginaLevo) predmet.x = marginaLevo;
      if (predmet.x >= marginaDesno) predmet.x = marginaDesno;
      if (predmet.y <= marginaGore) predmet.y = marginaGore;
      if (predmet.y >= marginaDole) predmet.y = marginaDole;
      break;
    default:
      // $.NASTAVI: nikad ne staje...
  }
}
