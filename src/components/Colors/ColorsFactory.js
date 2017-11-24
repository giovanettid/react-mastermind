import Colors from 'components/Colors/Colors';

export default class ColorsFactory {
  static create() {
    return new Colors(Math.random);
  }
}
