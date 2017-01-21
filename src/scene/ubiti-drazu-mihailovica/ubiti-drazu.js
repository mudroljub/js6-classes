'use strict';
// ubaciti poene i odbrojavanje

/*** KONFIG ***/

var platno = document.getElementById('myCanvas');
var podloga = platno.getContext('2d');
var POLUPRECNIK_NISANA = 25;
var BROJ_KOLONA = 30;
var BROJ_REDOVA = 35;
var LEVA_MARGINA = 139;
var AMORTIZER_SUDARA = 3;
var deliciSlike = [];
var DELIC_SIRINA = 10;
var DELIC_VISINA = 10;
var mish = {
  x: 0,
  y: 0,
  pritisnut: false
};


/*** LISTENERS ***/

platno.addEventListener('click', function() {
  mish.pritisnut = true;
}, false);

platno.addEventListener('mousemove', function(event) {
  var pozicija = nadjiPozMisha(event);
  mish.x = pozicija.x;
  mish.y = pozicija.y;
});

platno.addEventListener('mouseout', function() {
  mish.x = 0;
  mish.y = 0;
});


/*** LOGIKA IGRE ***/

praviDelice();

var slika = new Image();
slika.onload = function() {
  var trenutnoVreme = new Date().getTime();
  update(trenutnoVreme);
};
slika.src = '../../fotke/cetnici/draza/draza-njuska.jpg';

function update(zapamcenoVreme) {
  podloga.clearRect(0, 0, platno.width, platno.height);
  var trenutnoVreme = new Date().getTime();
  var vremRazlika = trenutnoVreme - zapamcenoVreme;
  azuriraDelice(vremRazlika);
  crtaDeliceSlike();
  crtaNishan();

  requestAnimationFrame(function() {
    update(trenutnoVreme);
  });
} // update


/*** POMOĆNE FUNKCIJE ***/

function praviDelice() {
  for (var n = 0; n < BROJ_KOLONA; n++) {
    for (var i = 0; i < BROJ_REDOVA; i++) {
      var imgX = n * DELIC_SIRINA;
      var imgY = i * DELIC_VISINA;
      var delic = {
        x: imgX + LEVA_MARGINA,
        y: imgY,
        imgX: imgX,
        imgY: imgY,
        vx: 0,
        vy: 0,
        prikacen: true
      };
      deliciSlike.push(delic);
    }
  } // for
} // praviDelice


function nadjiPozMisha(event) {
  var ovajElement = platno;
  var gore = 0;
  var levo = 0;
  while (ovajElement.tagName != 'BODY') {
    gore += ovajElement.offsetTop;
    levo += ovajElement.offsetLeft;
    ovajElement = ovajElement.offsetParent;
  }
  // vraca relativnu poziciju misha
  return {
    x: event.clientX - levo + window.pageXOffset,
    y: event.clientY - gore + window.pageYOffset
  };
} // nadjiPozMisha


function crtaDeliceSlike() {
  for (var n = 0; n < deliciSlike.length; n++) {
    var delicSlike = deliciSlike[n];
    podloga.drawImage(slika, delicSlike.imgX, delicSlike.imgY, DELIC_SIRINA, DELIC_VISINA, delicSlike.x, delicSlike.y, DELIC_SIRINA, DELIC_VISINA);
  }
} // crtaDeliceSlike


function azuriraDelice(vremRazlika) {
  for (var n = 0; n < deliciSlike.length; n++) {
    var delicSlike = deliciSlike[n];
    if (mish.pritisnut) otkaciDelic(delicSlike, vremRazlika);
    if (delicSlike.prikacen) continue;

    var gravitacija = 0.005 * vremRazlika;
    delicSlike.x += delicSlike.vx;
    delicSlike.y += delicSlike.vy;
    delicSlike.vy += gravitacija;

    if (delicSlike.x < 0 || delicSlike.x > platno.width - 10) {
      delicSlike.x = 0;
      delicSlike.vx /= AMORTIZER_SUDARA;
      delicSlike.vx *= -1;
    }
    if (delicSlike.y < 0 || delicSlike.y > platno.visina - 10) {
      delicSlike.vy /= AMORTIZER_SUDARA;
      delicSlike.vy *= -1;
    }
    if (delicSlike.y > platno.visina - 10) {
      delicSlike.y = platno.visina - 10;
    }
    if (delicSlike.y < 0) {
      delicSlike.y = 2;
    }
  } // for
  mish.pritisnut = false;
} // azuriraDelice


function otkaciDelic(delicSlike, vremRazlika) {
  var poluprecnikDelica = Math.sqrt(Math.pow(delicSlike.x - mish.x, 2) + Math.pow(delicSlike.y - mish.y, 2));
  if (poluprecnikDelica <= POLUPRECNIK_NISANA) {
    var vx = ((Math.random() * 10) - 5) * vremRazlika / 10;
    var vy = ((Math.random() * 10) - 5) * vremRazlika / 10;
    delicSlike.vx = vx;
    delicSlike.vy = vy;
    delicSlike.prikacen = false;
  }
} // otkaciDelic


function crtaNishan() {
  if (!mish.x || !mish.y) return;

  podloga.globalAlpha = 0.5; //providnost nišana
  podloga.beginPath();
  podloga.arc(mish.x, mish.y, POLUPRECNIK_NISANA, 0, 2 * Math.PI, false);
  podloga.fillStyle = 'red';
  podloga.fill();

  podloga.globalAlpha = 1;
  podloga.moveTo(mish.x, mish.y - POLUPRECNIK_NISANA - 10);
  podloga.lineTo(mish.x, mish.y + POLUPRECNIK_NISANA + 10);
  podloga.strokeStyle = 'black';
  podloga.lineWidth = 4;
  podloga.stroke();

  podloga.beginPath();
  podloga.moveTo(mish.x - POLUPRECNIK_NISANA - 10, mish.y);
  podloga.lineTo(mish.x + POLUPRECNIK_NISANA + 10, mish.y);
  podloga.strokeStyle = 'black';
  podloga.lineWidth = 4;
  podloga.stroke();
} // crtaNishan
