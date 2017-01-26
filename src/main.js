// popraviti loop
// da prosledjivanje update funkcije sceni bude opciono
// ukinuti zavisnost predmeta od scene?

import Jadran from './scene/Jadran'
import AvionPucaBocno from './scene/AvionPucaBocno'
import Osvetnik1944 from './scene/Osvetnik1944'
import TenkicIde from './scene/TenkicIde'
import Tenkici from './scene/Tenkici'
import TenkicAI from './scene/TenkicAI'
import BombasBunker from './scene/BombasBunker'
import SavoDan from './scene/SavoDan'
import SavoNoc from './scene/SavoNoc'
import RanjenikPatrole from './scene/RanjenikPatrole'
import RanjenikPaljba from './scene/RanjenikPaljba'
import NemciIzRovova from './scene/NemciIzRovova'
import UbijOkupatora from './scene/UbijOkupatora'
import Jasenovac from './scene/Jasenovac'
import TenkOdozgo from './scene/TenkOdozgo'

const trenutnaScena = new TenkOdozgo()
trenutnaScena.start()
