/*
* @param sablon: funkcija koja vraca sablon
*/
export class UI {

  constructor(sablon, id = 'ui') {
    this.upamcen = ''
    this.sablon = sablon
    this.element = document.getElementById(id) || document.createElement('div')
    if (!document.getElementById(id)) {
      document.body.appendChild(this.element)
      this.element.id = id
    }
  }

  render() {
    if (this.upamcen !== this.sablon()) {
      this.element.innerHTML = this.sablon()
      this.upamcen = this.sablon()
    }
  }

  clear() {
    this.element.innerHTML = ''
  }
}
