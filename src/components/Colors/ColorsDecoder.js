
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

  static getNbWrongPositions(colorsToGuess, colors) {
    const wrongColors = colors
      .filter((color, i) => ColorsDecoder.hasWrongPosition(colorsToGuess, color, i));

    return [...new Set(wrongColors)]
      .map(color => ColorsDecoder.nbOccurences(colorsToGuess, color))
      .reduce((sum, val) => sum + val, 0);
  }

  static getCorrectPositions(colorsToGuess, colors) {
    return colors
      .map((color, i) => ({ correct: color === colorsToGuess[i], position: i }))
      .filter(item => item.correct)
      .map(({ position }) => position);
  }

  getNbPositions(colors) {
    const correctPositions = ColorsDecoder.getCorrectPositions(this.colorsToGuess, colors);

    const colorsToGuessWithoutCorrect = ColorsDecoder
      .excludePositions(this.colorsToGuess, correctPositions);
    const colorsWithoutCorrect = ColorsDecoder.excludePositions(colors, correctPositions);

    const correct = correctPositions.length;
    const wrong = ColorsDecoder
      .getNbWrongPositions(colorsToGuessWithoutCorrect, colorsWithoutCorrect);

    return {
      correct,
      wrong,
      rest: this.colorsToGuess.length - correct - wrong,
    };
  }
}
