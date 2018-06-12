
const isWrong = (position, index) => index !== -1 && index !== position;

export default class ColorsPredicates {
  static wrong(colors) {
    return (color, position) => isWrong(position, colors.indexOf(color));
  }

  static exclude(positions) {
    return (color, position) => !positions.includes(position);
  }

  static same(colorToFind) {
    return color => color === colorToFind;
  }
}
