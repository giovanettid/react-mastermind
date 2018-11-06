
import ColorsPredicates from './ColorsPredicates';
import ColorsMappers from './ColorsMappers';

const nbOccurences = colors => ColorsMappers.nbOccurences(ColorsPredicates.same)(colors);

const minNbOccurences = (colorsToGuess, colors) =>
  color => Math.min(nbOccurences(colorsToGuess)(color), nbOccurences(colors)(color));

export default class ColorsDecoder {
  constructor(colorsToGuess) {
    this.colorsToGuess = colorsToGuess;
  }

  getNbWrongPositions(predicate) {
    const colorsToGuess = this.colorsToGuess.filter(predicate);
    return colors => [...new Set(
      colors.filter(predicate)
        .filter(ColorsPredicates.wrong(colorsToGuess)))]
      .map(minNbOccurences(colorsToGuess, colors))
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

  isAllCorrect(colors) {
    return this.getCorrectPositions(colors).length === this.colorsToGuess.length;
  }
}
