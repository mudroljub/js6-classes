// popraviti loop
// da prosledjivanje update funkcije sceni bude opciono
// ukinuti zavisnost predmeta od scene?

import Jadran from './scene/Jadran'
import AvionPucaBocno from './scene/AvionPucaBocno'
import Osvetnik1944 from './scene/Osvetnik1944'
import TenkicIde from './scene/TenkicIde'
// import tenkici from './scene/tenkic-dva-igraca'
// import tenkicAi from './scene/tenkic-protiv-kompa'
// import bombasPrepreke from './scene/bombas-i-prepreke'
// import savoDan from './scene/savo-dan'
// import savoNoc from './scene/savo-noc'
// import ranjenikPatrola from './scene/ranjenik-i-patrola'
// import ranjenikPaljba from './scene/ranjenik-i-paljba'
// import nemciIzRovova from './scene/nemci-iz-rovova'
// import ubijOkupatora from './scene/ubij-okupatora'
// import jasenovac from './scene/bekstvo-iz-jasenovca'
// import tenkOdozgo from './scene/tenk-puca-odozgo'

const trenutnaScena = new TenkicIde()
trenutnaScena.start()
