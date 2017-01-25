export class UI {

  constructor(praviSablon = () => ``) {
    this.element = document.createElement('div');
    document.body.appendChild(this.element);
    this.praviSablon = praviSablon
  }

  dodaj(sablon) {
    this.element.innerHTML = sablon
  }

  render() {
    if (this.element.innerHTML !== this.praviSablon()) this.element.innerHTML = this.praviSablon()
  }

}
