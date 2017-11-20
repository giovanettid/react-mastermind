const applyRandom = () => 0.5 - Math.random();

export default class Colors {
  constructor() {
    this.set = ['Red', 'Blue', 'Yellow', 'Green', 'White', 'Black'];
  }

  shuffle() {
    return this.set.sort(applyRandom);
  }
}
