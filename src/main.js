// fukusirati kanvas

import BombasScena from './scene/BombasScena'
import NemciIzRovova from './scene/NemciIzRovova'
import FranjoKluzScena from './scene/FranjoKluzScena'
import JasenovacScena from './scene/JasenovacScena'
import PomorskaScena from './scene/PomorskaScena'
import OtpisaniScena from './scene/OtpisaniScena'
import Scena1944 from './scene/Scena1944'

import TenkOdozgoScena from './scene/TenkOdozgoScena'

import TenkicIde from './scene/TenkicIde'
import TenkiciScena from './scene/TenkiciScena'
import TenkicAI from './scene/TenkicAI' // spojiti sa prethodnom

import SavoScena from './scene/SavoScena'
import SavoNoc from './scene/SavoNoc' // spojiti sa prethodnom

import RanjenikScena from './scene/RanjenikScena'
import RanjenikPaljba from './scene/RanjenikPaljba' // spojiti sa prethodnom

const trenutnaScena = new TenkOdozgoScena()
trenutnaScena.start()
