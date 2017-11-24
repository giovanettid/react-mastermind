import Colors from './Colors';

export default class ColorsFactory {
  static create() {
    return new Colors(Math.random);
  }
}
