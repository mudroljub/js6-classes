import rute from './rute'
import {UI} from './core/UI'

let aktivnaScena = null

const getRoute = () => window.location.hash.slice(1)

const sablon = () => {
  let izbornik = ``
  Object.keys(rute).map(ruta => {
    izbornik += `<button value='${ruta}' class='full'>${rute[ruta].naziv}</button>`
  })
  return `
    <h1>Glavni meni</h1>
    ${izbornik}
  `
}

export default class GlavniMeni {
  constructor() {
    this.meni = new UI(sablon, 'ui')
  }

  start() {
    window.addEventListener('load', this.ucitajScenu.bind(this))
    window.addEventListener('hashchange', this.ucitajScenu.bind(this))
    document.addEventListener('click', this.pustiScenu.bind(this))
    this.meni.render()
  }

  menjajScenu(ruta) {
    console.log('aktivnaScena:', aktivnaScena)
    if(aktivnaScena) aktivnaScena.stop()
    aktivnaScena = rute[ruta] ? new rute[ruta]() : this
    aktivnaScena.start()
  }

  ucitajScenu() {
    this.menjajScenu(getRoute())
  }

  pustiScenu(e) {
    const ruta = e.target.value
    this.menjajScenu(ruta)
    window.location.hash = ruta
  }

  stop() {
    window.removeEventListener('load', this.ucitajScenu.bind(this))
    window.removeEventListener('hashchange', this.ucitajScenu.bind(this))
    document.removeEventListener('click', this.pustiScenu.bind(this))
    this.meni.clear()
  }
}
