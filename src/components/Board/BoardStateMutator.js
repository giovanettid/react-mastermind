
const defaultColors = size => new Array(size).fill('lightgrey');

const createBoardColors = (nbRows, nbCodeHoles) => Array.from({ length: nbRows },
  () => defaultColors(nbCodeHoles));

export default class BoardStateMutator {
  constructor(nbRows, nbCodeHoles) {
    this.nbRows = nbRows;
    this.nbCodeHoles = nbCodeHoles;
  }

  isPreviousRow(item) {
    return item === this.nbCodeHoles;
  }

  static previousRow({ row }) {
    return { row: row - 1, item: 1 };
  }

  nextItem({ row = this.nbRows, item = 0 }) {
    return { row, item: item + 1 };
  }

  getInitial() {
    return { boardColors: createBoardColors(this.nbRows, this.nbCodeHoles) };
  }

  getNext(color) {
    return (prevState) => {
      const boardColors = prevState.boardColors;

      const { row, item } = this.isPreviousRow(prevState.item)
        ? BoardStateMutator.previousRow(prevState)
        : this.nextItem(prevState);
      boardColors[row - 1][item - 1] = color;

      return { row, item, boardColors };
    };
  }
}
