import {toUrl} from './utils'
import {UI} from './core/UI'
import BombasScena from './scene/BombasScena'
import NemciIzRovova from './scene/NemciIzRovova'
import FranjoKluzScena from './scene/FranjoKluzScena'
import JasenovacScena from './scene/JasenovacScena'
import PomorskaScena from './scene/PomorskaScena'
import OtpisaniScena from './scene/OtpisaniScena'
import Scena1944 from './scene/Scena1944'

// klice
import TenkOdozgoScena from './scene/TenkOdozgoScena'
import MinobacacScena from './scene/MinobacacScena'
import TopScena from './scene/TopScena'

// za spajanje
import TenkicIde from './scene/TenkicIde'
import TenkiciScena from './scene/TenkiciScena'
import TenkicAI from './scene/TenkicAI'

// za spajanje
import SavoScena from './scene/SavoScena'
import SavoNoc from './scene/SavoNoc'

// za spajanje
import RanjenikScena from './scene/RanjenikScena'
import RanjenikPaljba from './scene/RanjenikPaljba'

/* HELPERS */

const on = (e, fn) => document.addEventListener(e, fn)
const setRoute = ruta => window.location.hash = ruta
const getRoute = () => window.location.hash.slice(1)

/* KONFIG */

const scene = [
  BombasScena,
  NemciIzRovova,
  FranjoKluzScena,
  JasenovacScena,
  PomorskaScena,
  OtpisaniScena,
  Scena1944,
  TenkicIde,
  TenkiciScena,
  SavoScena,
  RanjenikScena
]

/* INIT */

const rute = {}
let trenutnaScena = null

scene.map(scena => rute[toUrl(scena.naziv)] = scena)

const sablon = () => {
  let dugmici = ``
  Object.keys(rute).map(ruta => {
    dugmici += `<button value='${ruta}' class='full'>${rute[ruta].naziv}</button>`
  })
  return `
    <h1>Glavni meni</h1>
    ${dugmici}
  `
}

const meni = new UI(sablon, 'ui')

/* EVENTS */

function pustiScenu() {
  const ruta = getRoute()
  if (rute[ruta]) new rute[ruta]().start()
  else meni.render()
}

on('click', e => {
  const ruta = e.target.value
  // let izabranaScena = scene[scena] || meni
  const izabranaScena = new rute[ruta]()
  setRoute(ruta)
  if (trenutnaScena) trenutnaScena.stop()
  trenutnaScena = izabranaScena
  trenutnaScena.start()
})

window.addEventListener('load', pustiScenu)
window.addEventListener('hashchange', pustiScenu)
