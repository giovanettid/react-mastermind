
export default class Colors {
  constructor(applyRandom) {
    this.applyRandom = applyRandom;
    this.set = ['Red', 'Blue', 'Yellow', 'Green', 'White', 'Black'];
  }

  shuffle() {
    return this.set.sort(() => 0.5 - this.applyRandom())
      .slice(0, 4);
  }
}
