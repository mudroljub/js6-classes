import * as $ from '../konstante';

export const tipke = {

  stisnute: new Array(256),
  ukupnoStisnutih: 0,

  init: () => {
    document.addEventListener("keydown", e => {
      if (!tipke.stisnute[e.keyCode]) tipke.ukupnoStisnutih++;
      tipke.stisnute[e.keyCode] = true;
      neTresi(e);
    });
    document.addEventListener("keyup", e => {
      tipke.stisnute[e.keyCode] = false;
      tipke.ukupnoStisnutih--;
    });
    document.addEventListener("touchstart", e => odaberiKomandu(e.touches[0]));
    document.addEventListener("touchmove", e => odaberiKomandu(e.touches[0]));
    document.addEventListener("touchend", () => tipke.reset());
  }(),

  reset: () => {
    tipke.stisnute.map(tipka => tipke.stisnute[tipka] = false);
  }

}

/* PRIVATNO */

function neTresi(e) {
  if (e.keyCode === $.RAZMAK || e.keyCode === $.GORE || e.keyCode === $.DOLE) e.preventDefault();
}

function odaberiKomandu(dodir) {
  if (dodir.pageY < window.innerHeight / 2) tipke.stisnute[$.GORE] = true;
  if (dodir.pageY >= window.innerHeight / 2) tipke.stisnute[$.DOLE] = true;
  if (dodir.pageX < window.innerWidth / 2) tipke.stisnute[$.LEVO] = true;
  if (dodir.pageX >= window.innerWidth / 2) tipke.stisnute[$.DESNO] = true;
}
