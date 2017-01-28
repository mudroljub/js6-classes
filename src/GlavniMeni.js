import rute from './rute'
import {UI} from './core/UI'

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
    this.meni.render()
  }
}
