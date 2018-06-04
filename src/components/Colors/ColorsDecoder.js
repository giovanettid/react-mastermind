
export default class ColorsDecoder {
  constructor(colorsToGuess) {
    this.colorsToGuess = colorsToGuess;
  }

  static nbOccurences(colors, colorToFind) {
    return colors.filter(color => color === colorToFind).length;
  }

  static hasWrongPosition(colors, color, position) {
    const index = colors.indexOf(color);
    return index !== -1 && index !== position;
  }

  static excludePositions(colors, positions) {
    return colors.filter((color, i) => !positions.includes(i));
  }

  getCorrectPositions(colors) {
    return colors
      .map((color, i) => ({ correct: this.hasCorrectPosition(color, i), position: i }))
      .filter(item => item.correct)
      .map(({ position }) => position);
  }

  getNbCorrectPositions(colors) {
    return this.getCorrectPositions(colors).length;
  }

  getNbWrongPositions(colors) {
    const correctPositions = this.getCorrectPositions(colors);

    const colorsToGuessWithoutCorrect = ColorsDecoder
      .excludePositions(this.colorsToGuess, correctPositions);

    const colorsWithoutCorrect = ColorsDecoder.excludePositions(colors, correctPositions);

    const wrongColors = colorsWithoutCorrect
      .filter((color, i) => ColorsDecoder.hasWrongPosition(colorsToGuessWithoutCorrect, color, i));

    const dedupeWrongColors = [...new Set(wrongColors)];

    return dedupeWrongColors.length
      ? dedupeWrongColors
        .map(color => ColorsDecoder.nbOccurences(colorsToGuessWithoutCorrect, color))
        .reduce((sum, val) => sum + val)
      : 0;
  }

  hasCorrectPosition(color, position) {
    return color === this.colorsToGuess[position];
  }
}
