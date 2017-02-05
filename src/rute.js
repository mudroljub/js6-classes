import {toUrl} from 'utils'

import BombasScena from './scene/bombas/BombasScena'
import NemciIzRovova from './scene/rovovi/NemciIzRovova'
import FranjoKluzScena from './scene/FranjoKluzScena'
import JasenovacScena from './scene/JasenovacScena'
import CamacScena from './scene/CamacScena'
import OtpisaniScena from './scene/OtpisaniScena'
import Scena1944 from './scene/avionce1944/Scena1944'

// klice
import TenkOdozgoScena from './scene/TenkOdozgoScena'
import MinobacacScena from './scene/MinobacacScena'
import TopScena from './scene/TopScena'

// za spajanje
import TenkicIde from './scene/tenkici/TenkicIde'
import TenkiciScena from './scene/tenkici/TenkiciScena'
import TenkicAI from './scene/tenkici/TenkicAI'

// za spajanje
import RanjenikScena from './scene/ranjenik/RanjenikScena'
import RanjenikPaljba from './scene/ranjenik/RanjenikPaljba'

const scene = [
  BombasScena,
  NemciIzRovova,
  FranjoKluzScena,
  // JasenovacScena,
  CamacScena,
  OtpisaniScena,
  Scena1944,
  TenkicIde,
  TenkiciScena,
  RanjenikScena
]
const rute = {}

scene.map(scena => rute[toUrl(scena.naziv)] = scena)

export default rute
