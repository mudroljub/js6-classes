import rute from './rute'
import {UI} from './core/UI'

const getRoute = () => window.location.hash.slice(1)

const sablon = () => {
  let izbornik = ``
  Object.keys(rute).map(ruta => {
    izbornik += `<button value='${ruta}' class='js-start full'>${rute[ruta].naziv}</button>`
  })
  return `
    <h1>Glavni glavniMeni</h1>
    ${izbornik}
  `
}

export default function indexController() {
  let aktivnaScena = null
  const glavniMeni = new UI(sablon, 'ui')

  const menjajScenu = ruta => {
    if (aktivnaScena) aktivnaScena.stop()
    aktivnaScena = rute[ruta] ? new rute[ruta]() : indexController()
    aktivnaScena.start()
  }

  const ucitajScenu = function() {
    menjajScenu(getRoute())
  }

  const pustiScenu = function(e) {
    if (!e.target.classList.contains('js-start')) return
    const ruta = e.target.value
    menjajScenu(ruta)
    window.location.hash = ruta
  }

  const start = () => {
    window.addEventListener('load', ucitajScenu)
    window.addEventListener('hashchange', ucitajScenu)
    document.addEventListener('click', pustiScenu)
    if (!rute[getRoute()]) glavniMeni.render()
  }

  const stop = () => {
    window.removeEventListener('load', ucitajScenu)
    window.removeEventListener('hashchange', ucitajScenu)
    document.removeEventListener('click', pustiScenu)
    glavniMeni.clear()
  }

  return {
    start: start,
    stop: stop
  }
}
