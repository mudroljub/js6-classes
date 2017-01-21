'use strict';

export class Dugme {

  constructor(label) {
    this.clicked = false;
    this.button = document.createElement("button");
    this.button.setAttribute("type", "button");
    this.button.innerHTML = label;
    this.button.style.position = "absolute";
    this.polozaj();
    this.button.onmousedown = () => this.clicked = true;
    this.button.ontouchstart = () => this.clicked = true;
    this.button.onmouseup = () => this.clicked = false;
    document.body.appendChild(this.button);
  }

  polozaj(levo = 0, gore = 0) {
    this.button.style.left = levo + "px";
    this.button.style.top = gore + "px";
  }

  velicina(sirina, visina) {
    this.button.style.width = sirina + "px";
    this.button.style.height = visina + "px";
  }

  jeKliknuto() {
    return this.button.clicked;
  }

} // Dugme
