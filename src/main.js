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

const scene = {
  "Bombaš": BombasScena,
  "Nemci iz rovova": NemciIzRovova,
  "Avijacija 1942": FranjoKluzScena,
  "Bekstvo iz Jasenovca": JasenovacScena,
  "Partizanska mornarica": PomorskaScena,
  "Ubij okupatora": OtpisaniScena,
  "Avijacija 1944": Scena1944,
  "Tenk ide": TenkicIde,
  "Tenkići": TenkiciScena,
  "Savo mitraljezac": SavoScena,
  "Ranjenik na Sutjesci": RanjenikScena
}

const sablon = () => {
  let meni = ``
  Object.keys(scene).map(key => {
      meni += `<button value='${key}' class='full'>${key}</button><br>`
  })
  return `
    <h1>Glavni meni</h1>
    ${meni}
  `
}

new UI(sablon, 'ui').render()

const on = (e, fn) => document.addEventListener(e, fn)

on('click', e => new scene[e.target.value]().start())

// function pustiScenu(scena) {
//   let izabranaScena = scene[scena] || meni
//   window.location.hash = scene[scena] ? scena : ''
//   trenutnaScena.stop()
//   trenutnaScena = izabranaScena
//   trenutnaScena.start()
//   window.scroll(0, 0)
// }

// const trenutnaScena = new scene.BombasScena()
// trenutnaScena.start()
