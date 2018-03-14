
const defaultColors = size => new Array(size).fill('lightgrey');

const createBoardColors = (nbRows, nbCodeHoles) => Array.from({ length: nbRows },
  () => defaultColors(nbCodeHoles));

export default class BoardState {
  constructor(nbRows, nbCodeHoles) {
    this.nbRows = nbRows;
    this.nbCodeHoles = nbCodeHoles;
  }

  isNextRow(prevState) {
    return prevState.item % this.nbCodeHoles === 0;
  }

  static nextRow(prevState) {
    return { row: prevState.row + 1, item: 1 };
  }

  static nextItem(prevState) {
    return { row: prevState.row, item: prevState.item + 1 };
  }

  getInitial() {
    return { row: 0, item: 0, boardColors: createBoardColors(this.nbRows, this.nbCodeHoles) };
  }

  getNext(color) {
    return (prevState) => {
      const boardColors = prevState.boardColors;

      const { row, item } = this.isNextRow(prevState)
        ? BoardState.nextRow(prevState)
        : BoardState.nextItem(prevState);
      boardColors[row - 1][item - 1] = color;

      return { row, item, boardColors };
    };
  }
}
