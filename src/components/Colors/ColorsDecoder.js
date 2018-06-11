
const isWrong = (position, index) => index !== -1 && index !== position;

const wrongPredicate = colors => (color, position) => isWrong(position, colors.indexOf(color));

const excludePredicate = positions => (color, position) => !positions.includes(position);

const identityPredicate = colorToFind => color => color === colorToFind;

const nbOccurencesMapping = colors => color => colors.filter(identityPredicate(color)).length;

const sumReducer = (sum, val) => sum + val;

const correctPositionMapping = colors => (color, position) => ({
  correct: color === colors[position],
  position,
});

export default class ColorsDecoder {
  constructor(colorsToGuess) {
    this.colorsToGuess = colorsToGuess;
  }

  static getNbWrongPositions(colors, colorsToGuess) {
    return [...new Set(colors.filter(wrongPredicate(colorsToGuess)))]
      .map(nbOccurencesMapping(colorsToGuess))
      .reduce(sumReducer, 0);
  }

  getCorrectPositions(colors) {
    return colors
      .map(correctPositionMapping(this.colorsToGuess))
      .filter(item => item.correct)
      .map(({ position }) => position);
  }

  getNbPositions(colors) {
    const correctPositions = this.getCorrectPositions(colors);

    const correct = correctPositions.length;

    const predicate = excludePredicate(correctPositions);

    const wrong = ColorsDecoder.getNbWrongPositions(
      colors.filter(predicate),
      this.colorsToGuess.filter(predicate));

    return {
      correct,
      wrong,
      rest: this.colorsToGuess.length - correct - wrong,
    };
  }
}
