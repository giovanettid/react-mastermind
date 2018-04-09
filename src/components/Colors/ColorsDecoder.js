
export default class ColorsDecoder {
  constructor(colorsToGuess) {
    this.colorsToGuess = colorsToGuess;
  }

  getCorrectPositions(colors) {
    return colors.filter((color, i) => color === this.colorsToGuess[i]).length;
  }

  getWrongPositions(colors) {
    return colors.filter((color, i) => {
      const index = this.colorsToGuess.indexOf(color);
      return index !== -1 && index !== i;
    }).length;
  }
}
