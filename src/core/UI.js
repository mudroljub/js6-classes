/*
* @param praviSablon(opciono): funkcija koja vraca sablon
*/
export class UI {
  constructor(praviSablon = () => ``) {
    this.element = document.createElement('div');
    document.body.appendChild(this.element);
    this.praviSablon = praviSablon
  }

  render() {
    // TODO: uvek prijavljuje da je razlicito!
    if (this.element.innerHTML !== this.praviSablon()) this.element.innerHTML = this.praviSablon()
  }

  // samo ga jednom ubaci, mozda nepotrebno
  dodaj(sablon) {
    this.element.innerHTML = sablon
  }
}
