'use strict';

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

let scena;
let pozadina;
let tabela;
let nishan;
let pogoci = 0;
let rekord = 0;
let energija = 100;
const DALJI_ROVOVI_Y = 150;
const BLIZI_ROVOVI_Y = 300;
let bliziRovovi = new Array(10);
let daljiRovovi = new Array(10);

/*** LOGIKA IGRE ***/

window.onload = init;

function init() {
  tabela = document.getElementById("tabela");
  scena = new Scena(update);
  pozadina = new Pozadina(scena, $.root + "slike/teksture/suva-trava.jpg");
  nishan = new Nishan(scena);
  ucitajRekord();
  praviSvabe(bliziRovovi, BLIZI_ROVOVI_Y, {sirina: 100, visina: 150, procenatPojavljivanja: 0.003});
  praviSvabe(daljiRovovi, DALJI_ROVOVI_Y, {sirina: 50, visina: 75, procenatPojavljivanja: 0.002});
  scena.start();
  document.onclick = () => {
    // proverava rovove u kliknutom delu ekrana
    let ciljaniRovovi = (nishan.y <= DALJI_ROVOVI_Y) ? daljiRovovi : bliziRovovi;
    proveriPogotke(ciljaniRovovi);
  }
} // init

function update() {
  scena.cisti();
  pozadina.update();
  azurirajSvabe(bliziRovovi);
  azurirajSvabe(daljiRovovi);
  prikaziPoene();
  //proveriKraj();
}


/*** POMOĆNE FUNKCIJE ***/

function praviSvabe(rovovi, y, params) {
  for (let i = 0; i < rovovi.length; i++) {
    rovovi[i] = new Svabo(scena, params.sirina, params.visina, params.procenatPojavljivanja);
    let randomX = Math.random() * scena.sirina;
    rovovi[i].polozaj(randomX, y);
  } // for
} // praviSvabe

function proveriPogotke(rovovi) {
  for (let i = 0; i < rovovi.length; i++) {
    if (rovovi[i].jePogodjen()) pogoci++;
  } // for
} // proveriPogotke

function azurirajSvabe(rovovi) {
  for (let i = 0; i < rovovi.length; i++) {
    if (rovovi[i].jePucao()) energija--;
    rovovi[i].update();
  } // for
} // azurirajSvabe

function ucitajRekord() {
  rekord = parseInt(localStorage.getItem("svabeRekord"));
  if (!rekord) rekord = 0;
} // ucitajRekord

function sacuvajRekord() {
  if (pogoci > rekord) {
    alert("Ubio si " + pogoci + " okupatora. To je novi rekord!");
    localStorage.setItem("svabeRekord", pogoci);
  } // if
} // sacuvajRekord

function prikaziPoene() {
  tabela.innerHTML =
    "Pogoci: " + pogoci + "<br>" +
    "Energija: " + energija + "<br>" +
    "Rekord: " + rekord;
} // prikaziPoene

function proveriKraj() {
  if (energija < 0) {
    sacuvajRekord();
    scena.stop();
    console.log("Play again...");
    // document.location.href = "";
  } // if
} // proveriKraj


/*** EXPORT ***/

export {scena}
