/*
* @param praviSablon: funkcija koja vraca sablon
*/
export class UI {
  constructor(praviSablon = () => ``) {
    this.element = document.createElement('section')

    // ili da js apenduje drukcim redosledom
    // ili redosled kontejnera u htmlu
    document.body.appendChild(this.element)
    this.praviSablon = praviSablon
  }

  render() {
    // BUG: uvek razlicito!
    if (this.element.innerHTML !== this.praviSablon()) this.element.innerHTML = this.praviSablon()
  }

  // ukloniti
  dodaj(sablon) {
    this.element.innerHTML = sablon
  }
}
