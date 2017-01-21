// srediti Nishan, više nema x i y, koristiti koordinate miša i this.jeMishIznad za koliziju
// gornje rovove ne pogađa
// da se ubrzava
// animirati švabu kako se dize i pada
// da se ne sudaraju?

/*** IMPORT ***/

import * as $ from '../konstante';
import {Scena} from '../core/Scena';
import {Pozadina} from '../core/Pozadina';
import {Nishan} from '../core/Nishan';
import {Svabo} from '../2d-prvo-lice/Svabo';

/*** KONFIG ***/

const DALJI_ROVOVI_Y = 150;
const BLIZI_ROVOVI_Y = 300;
const bliziRovovi = new Array(10);
const daljiRovovi = new Array(10);
let pogoci = 0;
let rekord = 0;
let energija = 100;

/*** LOGIKA IGRE ***/

// const tabela = document.getElementById("tabela");
const scena = new Scena(update);
const pozadina = new Pozadina(scena, $.root + "slike/teksture/suva-trava.jpg");
const nishan = new Nishan(scena);
ucitajRekord();
praviSvabe(bliziRovovi, BLIZI_ROVOVI_Y, {sirina: 100, visina: 150, procenatPojavljivanja: 0.003});
praviSvabe(daljiRovovi, DALJI_ROVOVI_Y, {sirina: 50, visina: 75, procenatPojavljivanja: 0.002});

document.onclick = () => {
  // proverava rovove u kliknutom delu ekrana
  let ciljaniRovovi = (nishan.y <= DALJI_ROVOVI_Y) ? daljiRovovi : bliziRovovi;
  proveriPogotke(ciljaniRovovi);
}

/*** FUNKCIJE ***/

function update() {
  scena.cisti();
  pozadina.update();
  azurirajSvabe(bliziRovovi);
  azurirajSvabe(daljiRovovi);
  // prikaziPoene();
  //proveriKraj();
}

function praviSvabe(rovovi, y, params) {
  for (let i = 0; i < rovovi.length; i++) {
    rovovi[i] = new Svabo(scena, params.sirina, params.visina, params.procenatPojavljivanja);
    let randomX = Math.random() * scena.sirina;
    rovovi[i].polozaj(randomX, y);
  }
}

function proveriPogotke(rovovi) {
  for (let i = 0; i < rovovi.length; i++) {
    if (rovovi[i].jePogodjen()) pogoci++;
  }
}

function azurirajSvabe(rovovi) {
  for (let i = 0; i < rovovi.length; i++) {
    if (rovovi[i].jePucao()) energija--;
    rovovi[i].update();
  }
}

function ucitajRekord() {
  rekord = parseInt(localStorage.getItem("svabeRekord"));
  if (!rekord) rekord = 0;
}

function sacuvajRekord() {
  if (pogoci > rekord) {
    alert("Ubio si " + pogoci + " okupatora. To je novi rekord!");
    localStorage.setItem("svabeRekord", pogoci);
  }
}

function prikaziPoene() {
  tabela.innerHTML =
    "Pogoci: " + pogoci + "<br>" +
    "Energija: " + energija + "<br>" +
    "Rekord: " + rekord;
}

function proveriKraj() {
  if (energija < 0) {
    sacuvajRekord();
    scena.stop();
    console.log("Play again...");
    // document.location.href = "";
  }
}

/*** EXPORT ***/

export default scena
