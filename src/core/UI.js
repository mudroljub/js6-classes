/*
* @param praviSablon: funkcija koja vraca sablon
*/
export class UI {

  constructor(praviSablon, id) {
    this.praviSablon = praviSablon
    this.element = document.getElementById(id) || document.createElement('div')
    if (!document.getElementById(id)) {
      document.body.appendChild(this.element)
      this.element.id = id
    }
  }

  start() {
    this.element.innerHTML = this.praviSablon()
  }

  render() {
    // BUG: uvek razlicito!
    if (this.element.innerHTML !== this.praviSablon()) this.element.innerHTML = this.praviSablon()
  }
}
