import {toUrl} from 'utils'

import BombasScena from './scene/BombasScena'
import NemciIzRovova from './scene/NemciIzRovova'
import FranjoKluzScena from './scene/FranjoKluzScena'
import JasenovacScena from './scene/JasenovacScena'
import CamacScena from './scene/CamacScena'
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
  SavoScena,
  RanjenikScena
]
const rute = {}

scene.map(scena => rute[toUrl(scena.naziv)] = scena)

export default rute
