// fukusirati kanvas

import PomorskaScena from './scene/PomorskaScena'
import FranjoKluzScena from './scene/FranjoKluzScena'
import Scena1944 from './scene/Scena1944'

import TenkicIde from './scene/TenkicIde'
import TenkiciScena from './scene/TenkiciScena'
import TenkicAI from './scene/TenkicAI' // spojiti sa prethodnom

import BombasScena from './scene/BombasScena'

import SavoScena from './scene/SavoScena'
import SavoNoc from './scene/SavoNoc' // spojiti sa prethodnom

import RanjenikScena from './scene/RanjenikScena'
import RanjenikPaljba from './scene/RanjenikPaljba' // spojiti sa prethodnom

import NemciIzRovova from './scene/NemciIzRovova'
import UbijOkupatora from './scene/UbijOkupatora'
import Jasenovac from './scene/Jasenovac'
import TenkOdozgoScena from './scene/TenkOdozgoScena'

const trenutnaScena = new NemciIzRovova()
trenutnaScena.start()
