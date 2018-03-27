
const defaultColors = size => new Array(size).fill('lightgrey');

const createBoardColors = (nbRows, nbCodeHoles) => Array.from({ length: nbRows },
  () => defaultColors(nbCodeHoles));

export default class BoardStateMutator {
  constructor(nbRows, nbCodeHoles, colorsToGuess) {
    this.nbRows = nbRows;
    this.nbCodeHoles = nbCodeHoles;
    this.colorsToGuess = colorsToGuess;
  }

  isLastItem(item) {
    return item === this.nbCodeHoles;
  }

  isLastMove({ row, item }) {
    return row === 1 && item === this.nbCodeHoles;
  }

  static previousRow({ row }) {
    return { row: row - 1, item: 1 };
  }

  nextItem({ row = this.nbRows, item = 0 }) {
    return { row, item: item + 1 };
  }

  getInitial() {
    return {
      boardColors: createBoardColors(this.nbRows, this.nbCodeHoles),
      positions: [],
    };
  }

  getPositions(codeColors) {
    const numberOfCorrectPositions = codeColors
      .filter((color, i) => color === this.colorsToGuess[i]).length;
    const numberOfWrongPositions = codeColors
      .filter((color, i) => {
        const index = this.colorsToGuess.indexOf(color);
        return index !== -1 && index !== i;
      }).length;
    return {
      numberOfCorrectPositions,
      numberOfWrongPositions,
    };
  }

  getNext(color) {
    return (prevState) => {
      if (this.isLastMove(prevState)) {
        return prevState;
      }

      const { boardColors } = prevState;

      const { row, item } = this.isLastItem(prevState.item)
        ? BoardStateMutator.previousRow(prevState)
        : this.nextItem(prevState);
      boardColors[row - 1][item - 1] = color;

      const { positions } = prevState;

      if (this.isLastItem(item)) {
        positions.push(this.getPositions(boardColors[row - 1]));
      }

      return { positions, row, item, boardColors };
    };
  }
}
