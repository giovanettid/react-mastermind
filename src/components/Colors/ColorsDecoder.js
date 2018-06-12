
import ColorsPredicates from './ColorsPredicates';
import ColorsMappers from './ColorsMappers';

export default class ColorsDecoder {
  constructor(colorsToGuess) {
    this.colorsToGuess = colorsToGuess;
  }

  getNbWrongPositions(predicate) {
    const colorsToGuess = this.colorsToGuess.filter(predicate);
    return colors => [...new Set(
      colors.filter(predicate)
        .filter(ColorsPredicates.wrong(colorsToGuess)))]
      .map(ColorsMappers.nbOccurences(colorsToGuess, ColorsPredicates.same))
      .reduce((sum, val) => sum + val, 0);
  }

  getCorrectPositions(colors) {
    return colors
      .map(ColorsMappers.correctPosition(this.colorsToGuess))
      .filter(item => item.correct)
      .map(({ position }) => position);
  }

  getNbPositions(colors) {
    const correctPositions = this.getCorrectPositions(colors);

    const correct = correctPositions.length;
    const wrong = this.getNbWrongPositions(ColorsPredicates.exclude(correctPositions))(colors);

    return {
      correct,
      wrong,
      rest: this.colorsToGuess.length - correct - wrong,
    };
  }
}
