export default class Colors {
  constructor(applyRandom) {
    this.applyRandom = applyRandom;
    this.set = ['Red', 'Blue', 'Yellow', 'Green', 'White', 'Black'];
  }

  shuffle() {
    const NB_COLORS_TO_PICK = 4;
    return new Array(NB_COLORS_TO_PICK).fill().map(() => this.pick());
  }

  pick() {
    return this.set[Math.floor(this.applyRandom() * this.set.length)];
  }
}
