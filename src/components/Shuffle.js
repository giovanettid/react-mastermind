export default class Shuffle {
  constructor() {
    this.colors = ['Red', 'Blue', 'Yellow', 'Green', 'White', 'Black'];
  }

  generate() {
    return Shuffle.random(this.colors);
  }

  static random(array) {
    return array.sort(() => 0.5 - Math.random());
  }
}
