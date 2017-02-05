import Predmet from 'core/Predmet'
import slikaKrater from 'slike/oblak.gif'

export class Paljba extends Predmet {

  constructor() {
    super(slikaKrater, 100, 74)
    this.postaviRandom()
  }

}
