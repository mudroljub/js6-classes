export class UI {

  constructor(sablon) {
    this.element = document.createElement('div');
    document.body.appendChild(this.element);
    this.sablon = sablon
  }

  dodaj(sablon) {
    this.element.innerHTML = sablon
  }

  render() {
    if (this.element.innerHTML !== this.sablon()) this.element.innerHTML = this.sablon()
  }

}
