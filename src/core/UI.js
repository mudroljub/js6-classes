export class UI {

  constructor() {
    this.interfejs = document.createElement('div');
    document.body.appendChild(this.interfejs);
  }

  dodaj(interfejs) {
    this.interfejs.innerHTML = interfejs;
  }

  render(interfejs) {
    if (this.interfejs.innerHTML !== interfejs) this.dodaj(interfejs);
  }

}
