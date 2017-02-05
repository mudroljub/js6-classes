import {toUrl} from 'utils'

import BombasScena from './scene/bombas/BombasScena'
import NemciIzRovova from './scene/rovovi/NemciIzRovova'
import Avionce1942 from './scene/avionce1942/Avionce1942'
import CamacScena from './scene/CamacScena'
import OtpisaniScena from './scene/OtpisaniScena'
import Scena1944 from './scene/avionce1944/Scena1944'

// za spajanje
import MinobacacScena from './scene/artiljerija/MinobacacScena'
import TopScena from './scene/artiljerija/TopScena'

// za spajanje
import TenkicIde from './scene/tenkici/TenkicIde'
import TenkiciScena from './scene/tenkici/TenkiciScena'
import TenkicAI from './scene/tenkici/TenkicAI'

// za spajanje
import RanjenikScena from './scene/ranjenik/RanjenikScena'
import RanjenikPaljba from './scene/ranjenik/RanjenikPaljba'

// za spajanje
import JasenovacScena from './scene/tenkovska/JasenovacScena'
import TenkOdozgoScena from './scene/tenkovska/TenkOdozgoScena'

const scene = [
  BombasScena,
  NemciIzRovova,
  Avionce1942,
  // JasenovacScena,
  TenkOdozgoScena,
  // TopScena,
  MinobacacScena,
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
