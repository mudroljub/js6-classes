import GlavniMeni from './GlavniMeni'
import rute from './rute'

const getRoute = () => window.location.hash.slice(1)
const glavniMeni = new GlavniMeni()

let aktivnaScena = null

/* FUNKCIJE */

const ucitajScenu = () => {
  const ruta = getRoute()
  aktivnaScena = rute[ruta] ? new rute[ruta]() : glavniMeni
  aktivnaScena.start()
}

const pustiScenu = e => {
  const ruta = e.target.value
  if (aktivnaScena) aktivnaScena.stop()
  aktivnaScena = new rute[ruta]()
  aktivnaScena.start()
  window.location.hash = ruta
}

/* EVENTS */

document.addEventListener('click', pustiScenu)
window.addEventListener('load', ucitajScenu)
window.addEventListener('hashchange', ucitajScenu)
